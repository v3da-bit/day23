var Handlebars = require('handlebars');
const moment = require('moment')
const {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const { log } = require('handlebars/runtime');
const { realpathSync } = require('fs');
var helpers = require('handlebars-helpers')({

    handlebars: Handlebars

});
let customHelper = {
    debug(value) {
        console.log('debug', value);
    },
    list(data) {
        let list = data.map((val, index) => {
            // console.log('vals',val);
            return {
                sr: index,
                ...val._doc
            }
        })
        console.log(list);
        return list.length > 0 ? list : 0

    },
    getParseDate(value) {
        return moment(value).format('YYYY-MM-DD')
    },
    ArrayToSetSalary(val) {
        let salaries = []
        val.forEach(val => {
            if (!salaries.includes(moment(val.date).format('YYYY-MM'))) {
                salaries.push(moment(val.date).format('YYYY-MM'))
            }
        })
        return salaries
    },
    typeHandle(val) {
        return val == 'cr' ? "Credited" : "Debited"
    },
    IdToString(value) {
        return value.toString()
    },
    parseDate(value) {
        return moment(value).format('lll')
    },
    getRole() {
        let roles = ["Team Lead", "Project Manager", "Developer", "Designer"]
        return roles
    },
    paginationBtn(value) {
        // console.log(value.length/5); 
        let btnArr = []
        for (let i = 1; i <= value; i++) {
            btnArr.push(i)
        }
        return btnArr
    },
    checkTech(tech, val) {
        console.log(tech,val,tech.includes('NodeJs'));
        return tech.includes(val)
    },
    returnTech(val) {
        console.log("techs",val);
    },
    formatMember(val) {
        let members = []
        val.forEach(value => {
            console.log(value.name);
            members.push(value.name)
        })
        return members
    },
    section: function (name, option) {
        if (!this._section) this._section = {}
        this._section[name] = option.fn(this);
        return null
    }
}

module.exports = {
    defaultLayout: 'default',
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        ...helpers,
        ...customHelper

    }
}