const { default: axios } = require('axios');
const Employee = require('../models/emloyee.schema')
const fs = require('fs');
const http = require('http');
const winston = require('winston')
const Logger = require('smart-logs')
const logger = new Logger()
logger.setLogDir('logs');
const reqModuleLog = logger.getLogger('req_module');
const reqErrModuleLog = logger.getLogger('req_err_module');
const resModuleLog = logger.getLogger('res_module');
const resErrModuleLog = logger.getLogger('res_err_module');
let instance = axios.create({
    baseURL: 'https://testapi.demoserver.biz/api/settings'
})
module.exports.showEmployeeRegister = async (req, res, next) => {
    try {
        let countryResponse = [], stateResponse = [], cityResponse = []
        let layout = 'default'
       
        instance.interceptors.request.use(function (config) {

            reqModuleLog.info('Requested for api');
            return config
        }, function (err) {
            reqErrModuleLog.info('Err in request', err)
            return err
        });

        countryResponse = await instance.post('/country')
        if (req.query?.country) {
            stateResponse = await instance.post('/state', {
                country: req.query?.country
            })
            layout = 'layout2'
        }
        if (req.query?.state) {
            cityResponse = await instance.post('/city', {
                country: req.query?.country,
                state: req.query?.state
            })
            layout = 'layout2'
        }

        instance.interceptors.response.use(function (config) {
            resModuleLog.info('response for api',config.data.data);
            return config
        }, function (err) {
            console.log('res err',err.message);
            resErrModuleLog.info('Err in response', err)
            throw new Error(err)
        });

        return res.render('registration', {
            layout: layout,
            selectedCountry: req.query?.country,
            countries: countryResponse.data?.data.countries,
            states: stateResponse.data?.data.states,
            selectedState: req.query?.state,
            cities: cityResponse.data?.data.cities
        })
    } catch (error) {
        // console.log('cathed',error);
        next(error)
    }
}
module.exports.postEmployeeRegister = async (req, res, next) => {
    try {
        console.log('files...', req.body, req.files, req.file);
        if (req.body?.name && req.body?.email && req.files?.length && req.body?.password && req.body?.country && req.body?.state && req.body?.city) {
            let address = {
                country: req.body?.country,
                state: req.body?.state,
                city: req.body?.city

            }
            console.log(address);
            let userIsExist = await Employee.findOne({ email: req.body?.email })
            if (userIsExist) {
                return res.status(409).json({ message: "User with this email already exist" })
            } else {
                let files = []
                req.files?.forEach(val => {
                    files.push('/uploads/' + val.filename)
                })
                const employee = new Employee({
                    name: req.body?.name,
                    file: files ? files : [],
                    email: req.body?.email,
                    address: address,
                    password: req.body?.password
                })
                await employee.save()
                return res.status(200).json({ message: "Employee added" })
            }

        } else {
            return res.status(404).json({ message: 'Please enter all details' })
        }

    } catch (error) {
        next(error)
    }
}
module.exports.listEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find()
        return res.render('listEmployee', { employees })
    } catch (error) {
        next(error)
    }
}
