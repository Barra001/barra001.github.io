document.addEventListener("keypress", async function(event) {
   
    
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




function mostrarRespuesta(opt) {
    var contador = document.getElementById("contador")
    let preguntaActual = parseInt(document.getElementById("actualPregunta").innerText) - 1;
    let opcionActual = document.getElementById(opt);

    if (preguntas[preguntaActual][opt][0] != "-" && !opcionActual.classList.contains("correcto")) {
        opcionActual.innerHTML =  preguntas[preguntaActual][opt][0] +'<div class="number">'+preguntas[preguntaActual][opt][1]+'</div>'
        contador.innerText = parseInt(contador.innerText) + preguntas[preguntaActual][opt][1]
        if(contador.innerText=="100"){
            animacionContenedor("grande")
            var audioWinner = new Audio('winersSound.mp3');
            audioWinner.play();
        }
        
        opcionActual.classList.add("correcto")
        var audio = new Audio('success-sound.mp3');
        audio.play();
        


    }else{
        if(contador.innerText=="100"){
            animacionContenedor("grandeMal")
            var audio = new Audio('error.mp3');
            audio.play();
        }
    }
}

async function animacionContenedor(option){
    document.getElementById("containerG").classList.add(option);
    await sleep(500)
    document.getElementById("containerG").classList.remove(option);
}

async function animacionNumero(){
    document.getElementById("actualPregunta").classList.add("nextNum");
    await sleep(800)
    document.getElementById("actualPregunta").classList.remove("nextNum");
}

function cargarPregunta() {
    var audio = new Audio('next-sound.mp3');
    audio.play();
    animacionNumero()
    contador.innerText = "0"
    let contenedorPreguntaNumero = document.getElementById("actualPregunta");
    contenedorPreguntaNumero.innerText = parseInt(contenedorPreguntaNumero.innerText) + 1;
    let cont = 1;
    while(cont !=9){
        let opcionActual = document.getElementById("opt"+cont);
        opcionActual.innerHTML=cont
        if(opcionActual.classList.contains("correcto")){
            opcionActual.classList.remove("correcto")
        }
        cont = cont +1
    }
   
    
}