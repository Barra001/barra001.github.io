// -------   Mail Send ajax
var formSnd = $('#myForm'); // contact for
$(document).ready(function () {

    var submit = $('.submit-btn'); // submit button
    // form submit event
    formSnd.on('submit', function (e) {
        e.preventDefault(); // prevent default form submit
        if (validateManualy()==true) {
            $.ajax({
                url: 'mail.php', // form action url
                type: 'POST', // form submit method get/post
                dataType: 'html', // request type html/json/xml
                data: formSnd.serialize(), // serialize form data
                beforeSend: function () {

                    submit.html('Enviando....'); // change submit button text
                },
                success: function (data) {

                    formSnd.trigger('reset'); // reset form
                    submit.html('Enviar Mensaje'); // change submit button text
                    callsuccesAlert()
                },
                error: function (e) {

                    callErrorAlert()
                    submit.html('Enviar Mensaje');

                }
            });
        }

    });
});



function validateManualy() {
    let toReturn = true;
    let arr = document.getElementsByClassName("form-control")
    for (let index = 0; index < arr.length; index++) {
        if(arr[index].checkValidity() == false) {
            
            toReturn= false
        }
    }
    return toReturn
}

async function callErrorAlert() {
    var errorAlert = document.getElementById("errorAlert")
    errorAlert.classList.remove("levantarAlert")
    void errorAlert.offsetWidth;
    errorAlert.classList.add("levantarAlert")
}

async function callsuccesAlert() {
    var succesAlert = document.getElementById("succesAlert")
    succesAlert.classList.remove("levantarAlert")
    void succesAlert.offsetWidth;
    succesAlert.classList.add("levantarAlert")
}

