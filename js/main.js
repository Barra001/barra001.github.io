var contador = document.getElementById("contador")
var isPlaying = false
var errorAudio = new Audio('/audio/error-sound.mp3');
var audioWinner = new Audio('/audio/winersSound.mp3');
var successAudio = new Audio('/audio/success-sound.mp3');
var bigErrorAudio = new Audio('/audio/error.mp3');
var nextAudio = new Audio('/audio/next-sound.mp3');
var audioMusic = new Audio('/audio/suspenso.mp3');
nextAudio.load()
bigErrorAudio.load()
successAudio.load()
audioWinner.load()
errorAudio.load()

audioMusic.loop = true
audioMusic.volume = 0.5
document.getElementById("volume-control").addEventListener("change", function (e) {

    audioMusic.volume = (e.currentTarget.value) / 100;
})


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



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
        if (contador.innerText == conseguirSuma(preguntas[preguntaActual])) {
            animacionContenedor("grandeMal")
            bigErrorAudio.currentTime = 0
            bigErrorAudio.play();
        } else {
            if (!opcionActual.classList.contains("disabled")) {
                opcionActual.innerHTML = '<div class="optionNumber">' + opt.substr(3, 3) + '</div>'
                opcionActual.classList.remove("correcto")
                let nuevaSumaAContador = parseInt(contador.innerText) - preguntas[preguntaActual][opt][1]
                contador.innerText = nuevaSumaAContador

            }

        }
    }
}

async function animacionContenedor(option) {
   
    document.getElementById("containerG").classList.add(option);
    document.getElementById("containerS").classList.add(option + "Adapt");
    if (option == "grande") {
        document.getElementById("imagen").classList.add("animationImagen")
        
    }
    await sleep(650)
    if (option == "grande") {
        document.getElementById("imagen").classList.remove("animationImagen")
    }
    document.getElementById("containerG").classList.remove(option);
    document.getElementById("containerS").classList.remove(option + "Adapt");
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

        opcionActual.classList.remove("correcto")
        opcionActual.classList.remove("opAnimate")

        opcionActual.classList.remove("disabled")
        oneTimeSetAnimateSync()

        cont = cont + 1
    }
    selectAvaliableQuestions()


}
oneTimeSetAnimateSync()

function oneTimeSetAnimateSync() {
    let cont = 1;
    while (cont != 9) {
        let opcionActual = document.getElementById("opt" + cont);
        animateOptionBackground(opcionActual)

        cont = cont + 1
    }
}

async function animateOptionBackground(theOp) {
    let randm = 100 * parseInt(theOp.id.substr(3, 3));
    await sleep(randm)
    theOp.classList.add("opAnimate");
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