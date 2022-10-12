rellenar();

var cantPromos = 0
var usingResponse =""
function trashClick(num){
    RefreshResponseString()
    let rows = usingResponse.split("*")
    num = num-1
    rows.splice(num, 1);
    usingResponse = rows.join("*")

    rows.pop()
    cantPromos = rows.length
    document.getElementById("promosAca").innerHTML=""

    ponerTodasLasPromosDeRows(rows)

}

function reqListener() {
    let response = this.responseText;
    usingResponse = response;
   
    let rows = response.split("*")
   

    rows.pop();
    cantPromos = rows.length
    ponerTodasLasPromosDeRows(rows)
    

}

function ponerTodasLasPromosDeRows(rows){
    let alt = 0;
    for (let cont = 1; cont <= cantPromos; cont = cont + 1) {
        let categorys = rows[alt].split("-")
        alt = alt +1;
        let unaPromo =  `<div class="col-10 col-lg-11 d-flex flex-column mt-3"><h2>Promo `+cont+`</h2></div> <div class="col-1 mt-3" style="display: grid; place-items: center;"><i style="font-size: 25px;" onclick="trashClick(`+cont+`)" class="trash bi bi-trash"></i></div> <div class="col-lg-12 d-flex flex-column"><input placeholder="Título" value="`+categorys[0]+`" name="titulo`+cont+`" onfocus="this.placeholder = ''"onblur="this.placeholder = 'Título Promo'" class="form-control mt-20" requiredtype="text"><div class="invalid-feedback">Ingrese Título.</div></div><div class="col-lg-6 d-flex flex-column"><input name="tipo`+cont+`" value="`+categorys[1]+`" placeholder="Descuento" onfocus="this.placeholder = ''"onblur="this.placeholder = 'Descuento'" class="form-control mt-20" requiredtype="text"><div class="invalid-feedback">Ingrese Descuento.</div></div><div class="col-lg-6 d-flex flex-column"><input name="validez`+cont+`" value="`+categorys[2]+`" placeholder="Validez" onfocus="this.placeholder = ''"onblur="this.placeholder = 'Validez'" class="form-control mt-20" requiredtype="text"><div class="invalid-feedback">Ingrese Validez.</div></div><div class="col-lg-12 d-flex flex-column"><input type="file" name="imagen`+cont+`" class="form-control mt-20" name="uploadFile" /><div class="invalid-feedback">Ingrese Imágen.</div></div>`;
        
        document.getElementById("promosAca").innerHTML+=unaPromo;

    }
}
function sumarPromo(){
    if(cantPromos>=4){
        callErrorAlert("Máximo 4 Promos");
        let button = document.getElementById("container-plus");
        button.classList.remove("redAnimation")
        void button.offsetWidth;
        button.classList.add("redAnimation")
        return;
    }
    RefreshResponseString()
    usingResponse = usingResponse+"--*";
    cantPromos = cantPromos +1;
    let cont = cantPromos;
    var unaPromo = document.createElement('div');
    document.getElementById("promosAca").appendChild(unaPromo);
    unaPromo.outerHTML =  `<div class="col-10 col-lg-11 d-flex flex-column mt-3"><h2>Promo `+cont+`</h2></div> <div class="col-1 mt-3" style="display: grid; place-items: center;"><i style="font-size: 25px;" onclick="trashClick(`+cont+`)" class="trash bi bi-trash"></i></div> <div class="col-lg-12 d-flex flex-column"><input placeholder="Título" name="titulo`+cont+`" onfocus="this.placeholder = ''"onblur="this.placeholder = 'Título Promo'" class="form-control mt-20" requiredtype="text"><div class="invalid-feedback">Ingrese Título.</div></div><div class="col-lg-6 d-flex flex-column"><input name="tipo`+cont+`"  placeholder="Descuento" onfocus="this.placeholder = ''"onblur="this.placeholder = 'Descuento'" class="form-control mt-20" requiredtype="text"><div class="invalid-feedback">Ingrese Descuento.</div></div><div class="col-lg-6 d-flex flex-column"><input name="validez`+cont+`" placeholder="Validez" onfocus="this.placeholder = ''"onblur="this.placeholder = 'Validez'" class="form-control mt-20" requiredtype="text"><div class="invalid-feedback">Ingrese Validez.</div></div><div class="col-lg-12 d-flex flex-column"><input type="file" name="imagen`+cont+`" class="form-control mt-20" name="uploadFile" /><div class="invalid-feedback">Ingrese Imágen.</div></div>`;
    
}


function rellenar() {
    var req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("GET", "getPromos.php");
    req.send();

}

function validateManualy() {
    let toReturn = true;
    let arr = document.getElementsByClassName("form-control")
    for (let index = 0; index < arr.length; index++) {
        if (arr[index].checkValidity() == false) {

            toReturn = false
        }
    }
    return toReturn
}



$(document).ready(function () {
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
    var theForm = document.getElementById("backForm")

    theForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        if (validateManualy() == true) {
            let envio = {
                user: document.getElementsByName("usuario")[0].value,
                password: document.getElementsByName("contraseña")[0].value,
                cant: cantPromos
            }
            for(let i = 1; i<=cantPromos; i=i+1){
                envio["titulo"+i]=document.getElementsByName("titulo"+i)[0].value.replaceAll("-","").replaceAll("*", "")
                envio["tipo"+i]=document.getElementsByName("tipo"+i)[0].value.replaceAll("-","").replaceAll("*", "")
                envio["validez"+i]=document.getElementsByName("validez"+i)[0].value.replaceAll("-","").replaceAll("*", "")
            }



            $.ajax({
                url: 'setPromos.php',
                type: 'POST',
                dataType: 'html',
                data: envio,
                beforeSend: function () {
                    document.getElementById("loaderPos").innerHTML = '<div id="preloader" class="centradorLoader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>'
                },
                success: function (data) {
                    document.getElementsByName("usuario")[0].value = ""
                    document.getElementsByName("contraseña")[0].value = ""
                    document.getElementById("loaderPos").innerHTML = '<button id="updBackBtn" type="submit" class="primary-btn primary mt-20 text-uppercase">Actualizar Promos</button>'
                    if(data != "tute bien."){
                        callErrorAlert(data);

                    }else{
                        callsuccesAlert();

                    }
                    
                    
                },
                error: function (e) {
                    document.getElementsByName("usuario")[0].value = ""
                    document.getElementsByName("contraseña")[0].value = ""
                    document.getElementById("loaderPos").innerHTML = '<button id="updBackBtn" type="submit" class="primary-btn primary mt-20 text-uppercase">Actualizar Promos</button>'
                    callErrorAlert(e);
                }
            });

        }else{
            callErrorAlert("Ingresar Usuario y Contraseña");
        }

    });

})


function RefreshResponseString(){
    let total = "";
    for(let i = 1; i<=cantPromos; i=i+1){
        let titulo =document.getElementsByName("titulo"+i)[0].value.replaceAll("-","").replaceAll("*", "")
        let tipo = document.getElementsByName("tipo"+i)[0].value.replaceAll("-","").replaceAll("*", "")
        let validez = document.getElementsByName("validez"+i)[0].value.replaceAll("-","").replaceAll("*", "")

        let fila = titulo+"-"+tipo+"-"+validez+"*";
        total+= fila;
    }
    usingResponse = total;
    
}

async function callErrorAlert(msj) {
    document.getElementById("callErrorAlert").innerText = msj;
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