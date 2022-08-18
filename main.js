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
    { pregunta: "¿Cual es la mejor cancion de misa?", opt1: ["Vida en abundancia", 51], opt2: ["Eres", 18], opt3: ["Vale la pena", 12], opt4: ["Nada te turbe", 8], opt5: ["Tú estás aquí", 6], opt6: ["Todo en esta vida", 5], opt7: "-", opt8: "-" },
    { pregunta: "¿Quien es el mejor?", opt1: ["Juan", 50], opt2: ["Pepe", 20], opt3: ["Carlos", 10], opt4: ["Jaime", 9], opt5: ["Pedro", 11], opt6: "-", opt7: "-", opt8: "-" },
    { pregunta: "¿Quien es golador?", opt1: ["Messi", 60], opt2: ["Ronaldo", 25], opt3: ["Puyol", 11], opt4: ["Neymar", 2], opt5: ["David Luis", 1], opt6: ["JuancarLos", 1], opt7: "-", opt8: "-" },
    { pregunta: "¿Que colores hay?", opt1: ["Rojo", 80], opt2: ["Verde", 5], opt3: ["Azul", 5], opt4: ["Amarillo", 5], opt5: ["Naranja", 2], opt6: ["Blanco", 1], opt7: ["Negro", 1], opt8: ["Gris", 1] }

];
var contador = document.getElementById("contador")

selectAvaliableQuestions()

function mostrarRespuesta(opt) {

    let preguntaActual = parseInt(document.getElementById("actualPregunta").innerText) - 1;
    let opcionActual = document.getElementById(opt);

    if (preguntas[preguntaActual][opt][0] != "-" && !opcionActual.classList.contains("correcto")) {
        opcionActual.innerHTML = preguntas[preguntaActual][opt][0] + '<div class="number">' + preguntas[preguntaActual][opt][1] + '</div>'
        contador.innerText = parseInt(contador.innerText) + preguntas[preguntaActual][opt][1]
        if (contador.innerText == "100") {
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
        opcionActual.innerHTML = cont
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

    } else {
        textElement.innerText = "pause"
        isPlaying = true
        audioMusic.play();

    }

}