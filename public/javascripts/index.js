const employeeHandler = function () {
    this.initialize = function () {
        
            this.postEmployee();
       
    };
this.postEmployee = function () {
    $('#submit').on('submit', async function (e) {
        e.preventDefault()
        let fd = new FormData($('#submit')[0])
        console.log('fd called here....', fd)
        let url = $('#submit').attr('action');
        $("#loader").removeClass('d-none')
        return $.ajax({
            url: url,
            method: 'post',
            data: fd,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#liveToast').removeClass('hide')
                $('#liveToast').addClass('show')
                console.log(result)
                $('#toastBody').text(result.message)
                $("#loader").addClass('d-none')

                setTimeout(() => {
                    window.location.href = '/'
                }, 3000)

            },
            error: function (err) {
                console.log(err)
                $("#loader").addClass('d-none')

                $('#liveToastErr').removeClass('hide')
                $('#liveToastErr').addClass('show')
                $('#toastBodyErr').text(err.responseJSON.message)
            }
        });
    })

    }
    let _this = this
    this.initialize()

}


