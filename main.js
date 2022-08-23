var isPlaying = false
var errorAudio = new Audio('/audio/error-sound.mp3');
var audioWinner = new Audio('/audio/winersSound.mp3');
var successAudio = new Audio('/audio/success-sound.mp3');
var bigErrorAudio = new Audio('/audio/error.mp3');
var nextAudio = new Audio('/audio/next-sound.mp3');
nextAudio.load()
bigErrorAudio.load()
successAudio.load()
audioWinner.load()
errorAudio.load()

document.addEventListener("keypress", async function (event) {


    if (event.keyCode == 32) {

        document.getElementById("cross").classList.add("mostrarCross");
        errorAudio.currentTime = 0
        errorAudio.play();
        await sleep(2000)
        document.getElementById("cross").classList.remove("mostrarCross");
    }
    if (event.keyCode == 49) {

        mostrarRespuesta('opt1')
    }
    if (event.keyCode == 50) {

        mostrarRespuesta('opt2')
    }
    if (event.keyCode == 51) {

        mostrarRespuesta('opt3')
    }
    if (event.keyCode == 52) {

        mostrarRespuesta('opt4')
    }
    if (event.keyCode == 53) {

        mostrarRespuesta('opt5')
    }
    if (event.keyCode == 54) {

        mostrarRespuesta('opt6')
    }
    if (event.keyCode == 55) {

        mostrarRespuesta('opt7')
    }
    if (event.keyCode == 56) {

        mostrarRespuesta('opt8')
        
    }
    if (event.keyCode == 57) {

        cargarPregunta(1)
        
    }
    if (event.keyCode == 48) {

        cargarPregunta(-1)
    }
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var preguntas = [
    { pregunta: "", opt1: ["Vida en abundancia", 33], opt2: ["Alma misionera", 22], opt3: ["Frente a tu trono", 10], opt4: ["Eres", 7], opt5: ["Vale la pena", 6], opt6: ["Dime rey", 6], opt7: ["Perfume a tus pies", 4], opt8: "-" },
    { pregunta: "", opt1: ["Rosario", 36], opt2: ["Sobre de dormir", 14], opt3: ["Abrigo", 14], opt4: ["Biblia", 11], opt5: ["Mate", 9], opt6: ["Colchón", 6], opt7: ["Cruz", 5], opt8: "-" },
    { pregunta: "", opt1: ["Misa", 21], opt2: ["El Piso", 18], opt3: ["El Baño", 6], opt4: ["En Adoración", 6], opt5: ["La vigilia", 4], opt6: ["Al lado del que ronca", 4], opt7: ["Bondi", 3], opt8: "-" },
    { pregunta: "", opt1: ["La comunión", 53], opt2: ["La homilía", 20], opt3: ["La consagración", 9], opt4: ["Saludo de paz", 6], opt5: ["Cuando cantamos", 5], opt6: ["Acción de gracias", 5], opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["Cuando todos duermen", 33], opt2: ["El Almuerzo", 20], opt3: ["Antes de dormir", 17], opt4: ["Rato Libre", 9], opt5: ["Post Misionada", 7], opt6: ["De tarde / Siesta", 4], opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["Stella", 58], opt2: ["Catedral", 19], opt3: ["San juan bautista", 8], opt4: ["Sociedad de san juan", 5], opt5: "-", opt6: "-", opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["Pasta", 34], opt2: ["Arroz con cosas", 19], opt3: ["Guiso", 13], opt4: ["Pizza", 9], opt5: ["Polenta", 8], opt6: ["Panchos", 6], opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["5", 23], opt2: ["3", 11], opt3: ["2", 11], opt4: ["10", 9], opt5: ["15", 9], opt6: ["7", 8], opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["Marí­a", 16], opt2: ["Sofí­a", 9], opt3: ["Agustina", 7], opt4: ["Andrea", 6], opt5: ["Florencia", 5], opt6: "-", opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["Juan", 26], opt2: ["Kevin", 21], opt3: ["José", 14], opt4: "-", opt5: "-", opt6: "-", opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["Salto", 24], opt2: ["Rivera", 11], opt3: ["Paysandú", 9], opt4: ["Maldonado", 8], opt5: ["Durazno", 7], opt6: ["Canelones", 7], opt7: ["Florida", 4], opt8: "-" },
    { pregunta: "", opt1: ["La Mater", 24], opt2: ["La cruz", 21], opt3: ["Denario", 19], opt4: ["La Biblia", 12], opt5: ["Una estampita", 9], opt6: ["Cadenita", 7], opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["No me interesa / andáte", 64], opt2: ["Un insulto", 13], opt3: ["Tengo COVID", 8], opt4: ["Me hice encima", 6], opt5: "-", opt6: "-", opt7: "-", opt8: "-" },
    { pregunta: "", opt1: ["Ahora no puedo / estoy ocupado", 34], opt2: ["No me interesa", 34], opt3: ["Estoy cocinando", 12], opt4: ["Tengo un cumple", 11], opt5: ["Tengo un problema personal", 4], opt6: "-", opt7: "-", opt8: "-" }

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
        opcionActual.innerHTML = '<div class="textOption">' + preguntas[preguntaActual][opt][0] + '</div>' + '<div class="number">' + preguntas[preguntaActual][opt][1] + '</div>'

        let sumaAContador = parseInt(contador.innerText) + preguntas[preguntaActual][opt][1]
        contador.innerText = sumaAContador
        if (sumaAContador == conseguirSuma(preguntas[preguntaActual])) {
            animacionContenedor("grande")
            audioWinner.currentTime = 0
            audioWinner.play();
        }

        opcionActual.classList.add("correcto")
        successAudio.currentTime = 0
        successAudio.play();



    } else {
        if (contador.innerText == "100") {
            animacionContenedor("grandeMal")
            bigErrorAudio.currentTime = 0
            bigErrorAudio.play();
        }
    }
}

async function animacionContenedor(option) {

    document.getElementById("containerG").classList.add(option);
    if (option == "grande") {
        document.getElementById("imagen").classList.add("animationImagen")
    }
    await sleep(650)
    if (option == "grande") {
        document.getElementById("imagen").classList.remove("animationImagen")
    }
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
        bigErrorAudio.currentTime = 0
        bigErrorAudio.play();
        return
    }
    nextAudio.currentTime = 0
    nextAudio.play();
    animacionNumero()
    contador.innerText = "0"

    contenedorPreguntaNumero.innerText = siguientePag;
    let cont = 1;
    while (cont != 9) {
        let opcionActual = document.getElementById("opt" + cont);
        opcionActual.innerHTML = '<div class="optionNumber">' + cont + '</div>'
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
var audioMusic = new Audio('/audio/suspenso.mp3');
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
        document.getElementsByClassName("volumeControl")[0].style.display = "none"
    } else {
        textElement.innerText = "pause"
        isPlaying = true
        audioMusic.play();
        document.getElementsByClassName("volumeControl")[0].style.display = "grid"

    }

}