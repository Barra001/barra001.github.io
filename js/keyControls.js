
document.addEventListener("keydown", async function (event) {

    if (event.code == "Space") {

        document.getElementById("cross").classList.add("mostrarCross");
        errorAudio.currentTime = 0
        errorAudio.play();
        await sleep(2000)
        document.getElementById("cross").classList.remove("mostrarCross");
    }
    if (event.code == "Numpad1" || event.code == "Digit1") {

        mostrarRespuesta('opt1')
    }
    if (event.code == "Numpad2" || event.code == "Digit2") {

        mostrarRespuesta('opt2')
    }
    if (event.code == "Numpad3" || event.code == "Digit3") {

        mostrarRespuesta('opt3')
    }
    if (event.code == "Numpad4" || event.code == "Digit4") {

        mostrarRespuesta('opt4')
    }
    if (event.code == "Numpad5" || event.code == "Digit5") {

        mostrarRespuesta('opt5')
    }
    if (event.code == "Numpad6" || event.code == "Digit6") {

        mostrarRespuesta('opt6')
    }
    if (event.code == "Numpad7" || event.code == "Digit7") {


        mostrarRespuesta('opt7')
    }
    if (event.code == "Numpad8" || event.code == "Digit8") {

        mostrarRespuesta('opt8')

    }
    if (event.code == "ArrowRight") {

        cargarPregunta(1)

    }
    if (event.code == "ArrowLeft") {

        cargarPregunta(-1)
    }
});