var isPlaying = false

document.addEventListener("keypress", async function (event) {


    if (event.keyCode == 32) {

        document.getElementById("cross").classList.add("mostrarCross");
        var audio = new Audio('error-sound.mp3');
        audio.play();
        await sleep(2000)
        document.getElementById("cross").classList.remove("mostrarCross");
    }
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var preguntas = [
    { pregunta: "", opt1: ["Vida en abundancia", 33], opt2: ["Alma misionera", 25], opt3: ["Frente a tu trono", 8], opt4: ["Eres", 5], opt5: ["Vale la pena", 5], opt6: ["Dime rey", 5], opt7: ["Perfume a tus pies", 5], opt8: "-" },
    { pregunta: "", opt1: ["Rosario", 35], opt2: ["Sobre de dormir", 15], opt3: ["Abrigo", 13], opt4: ["Biblia", 10], opt5: ["Mate", 8], opt6: ["Colchón", 5], opt7: ["Cruz", 5], opt8: "-" },
    { pregunta: "", opt1: ["Misa", 20], opt2: ["El Piso", 18], opt3: ["El Baño", 8], opt4: ["En Adoración", 8], opt5: ["La vigilia", 5], opt6: ["Al lado del que ronca", 5], opt7: ["Bondi", 5], opt8: ["La cena", 5] },
    { pregunta: "", opt1: ["La comunión", 53], opt2: ["La Homilía", 18], opt3: ["La consagración", 8], opt4: ["Saludo de paz", 5], opt5: ["Cuando cantamos", 5], opt6: ["Acción de gracias", 5], opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["Cuando todos duermen", 33], opt2: ["El Almuerzo", 18], opt3: ["Antes de dormir", 15], opt4: ["Rato Libre", 8], opt5: ["Post Misionada", 5], opt6: ["De tarde / Siesta", 5], opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["Stella", 58], opt2: ["Catedral", 18], opt3: ["San juan bautista", 8], opt4: ["Sociedad de san juan", 5], opt5: "-", opt6: "-", opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["No me interesa / andate", 65], opt2: ["Un insulto", 13], opt3: ["Tengo COVID", 8], opt4: ["Me hice encima", 5], opt5: "-", opt6: "-", opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["Pasta", 33], opt2: ["Arroz con cosas", 18], opt3: ["Guiso", 13], opt4: ["Pizza", 8], opt5: ["Polenta", 8], opt6: ["Pan", 5], opt7: ["Panchos", 5], opt8: ["Galletas de campo", 5] },
    { pregunta: "", opt1: ["Ahora no puedo / estoy ocupado", 33], opt2: ["No me interesa", 33], opt3: ["Estoy cocinando", 13], opt4: ["Tengo un cumple", 13], opt5: ["Tengo un problema personal", 5], opt6: "-", opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["5", 23], opt2: ["3", 10], opt3: ["2", 10], opt4: ["10", 10], opt5: ["15", 10], opt6: ["7", 8], opt7: ["4", 5], opt8: ["6", 5] },
    { pregunta: "", opt1: ["María", 15], opt2: ["Sofía", 8], opt3: ["Agustina", 5], opt4: ["Andrea", 5], opt5: ["Florencia", 5], opt6: "-", opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["Juan", 25], opt2: ["Kevin", 20], opt3: ["José", 15], opt4: "-", opt5: "-", opt6: "-", opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["Salto", 25], opt2: ["Rivera", 10], opt3: ["Paysandú", 8], opt4: ["Maldonado", 8], opt5: ["Durazno", 8], opt6: ["Canelones", 8], opt7: ["Florida", 5], opt8: ["Lavalleja", 5] },
    { pregunta: "", opt1: ["La Mater", 23], opt2: ["La cruz", 20], opt3: ["Denario", 18], opt4: ["La Biblia", 13], opt5: ["Una estampita", 10], opt6: ["Cadenita", 5], opt7: "-", opt8: "-" }

];
var contador = document.getElementById("contador")

selectAvaliableQuestions()

function conseguirSuma(pregunta) {
    let suma = 0
    for (let i = 1; i <= 8; i++) {
        let element = pregunta["opt" + i]
        if (element[1]) {
            suma = suma + element[1]
        }

    }
    return suma

}

function mostrarRespuesta(opt) {

    let preguntaActual = parseInt(document.getElementById("actualPregunta").innerText) - 1;
    let opcionActual = document.getElementById(opt);

    if (preguntas[preguntaActual][opt][0] != "-" && !opcionActual.classList.contains("correcto")) {
        opcionActual.innerHTML = '<div class="textOption">'+ preguntas[preguntaActual][opt][0]+'</div>'+ '<div class="number">' + preguntas[preguntaActual][opt][1] + '</div>'

        let sumaAContador = parseInt(contador.innerText) + preguntas[preguntaActual][opt][1]
        contador.innerText = sumaAContador
        if (sumaAContador == conseguirSuma(preguntas[preguntaActual])) {
            animacionContenedor("grande")
            var audioWinner = new Audio('winersSound.mp3');
            audioWinner.play();
        }

        opcionActual.classList.add("correcto")
        var audio = new Audio('success-sound.mp3');
        audio.play();



    } else {
        if (contador.innerText == "100") {
            animacionContenedor("grandeMal")
            var audio = new Audio('error.mp3');
            audio.play();
        }
    }
}

async function animacionContenedor(option) {

    document.getElementById("containerG").classList.add(option);

    await sleep(650)

    document.getElementById("containerG").classList.remove(option);
}

async function animacionNumero() {
    document.getElementById("actualPregunta").classList.add("nextNum");
    await sleep(750)
    document.getElementById("actualPregunta").classList.remove("nextNum");
}

function cargarPregunta(sum) {
    let contenedorPreguntaNumero = document.getElementById("actualPregunta");
    let siguientePag = parseInt(contenedorPreguntaNumero.innerText) + sum;
    if (siguientePag == 0 || siguientePag == preguntas.length + 1) {
        var audio = new Audio('error.mp3');
        audio.play();
        return
    }
    var audio = new Audio('next-sound.mp3');
    audio.play();
    animacionNumero()
    contador.innerText = "0"

    contenedorPreguntaNumero.innerText = siguientePag;
    let cont = 1;
    while (cont != 9) {
        let opcionActual = document.getElementById("opt" + cont);
        opcionActual.innerHTML =  '<div class="optionNumber">' + cont + '</div>'
        if (opcionActual.classList.contains("correcto")) {
            opcionActual.classList.remove("correcto")
        }
        if (opcionActual.classList.contains("disabled")) {
            opcionActual.classList.remove("disabled")
        }
        cont = cont + 1
    }
    selectAvaliableQuestions()


}

function selectAvaliableQuestions() {

    let preguntaActual = parseInt(document.getElementById("actualPregunta").innerText) - 1;
    let cont = 1;
    while (cont != 9) {
        if (preguntas[preguntaActual]["opt" + cont] == "-") {
            let opcionActual = document.getElementById("opt" + cont);
            opcionActual.innerHTML = "";
            opcionActual.classList.add("disabled")
        }
        cont = cont + 1
    }
}
var audioMusic = new Audio('suspenso.mp3');
audioMusic.loop = true
audioMusic.volume = 0.5
document.getElementById("volume-control").addEventListener("change", function (e) {

    audioMusic.volume = (e.currentTarget.value) / 100;
})
function togglePlay() {
    let textElement = document.getElementById("playText")
    if (isPlaying) {

        textElement.innerText = "play_arrow"
        isPlaying = false
        audioMusic.pause();
        document.getElementsByClassName("volumeControl")[0].style.display="none"
    } else {
        textElement.innerText = "pause"
        isPlaying = true
        audioMusic.play();
        document.getElementsByClassName("volumeControl")[0].style.display="grid"

    }

}