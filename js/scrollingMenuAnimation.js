const mainTitle = document.getElementById("main-title").innerText.toLocaleLowerCase();
const aboutTitle = document.getElementById("about-title").innerText.toLocaleLowerCase();
const serviceTitle = document.getElementById("services-title").innerText.toLocaleLowerCase();
const tipsTitle = document.getElementById("tips-title").innerText.toLocaleLowerCase();
const promosTitle = document.getElementById("promos-title").innerText.toLocaleLowerCase();
const contactTitle = document.getElementById("contact-title").innerText.toLocaleLowerCase();
const ubicTitle = document.getElementById("ubication-title").innerText.toLocaleLowerCase();
const anchors = document.getElementsByClassName("aTocar")

//Pasa de titulo a anchor id
function traductor(palabra) {
    palabra = palabra.toLocaleLowerCase()
    palabra = palabra.trim()
    if (palabra == mainTitle) {
        return "aTocar-inicio";
    } else if (palabra == aboutTitle) {
        return "aTocar-nosotras";

    } else if (palabra == serviceTitle) {
        return "aTocar-servicios";

    } else if (palabra == tipsTitle) {
        return "aTocar-tips";

    } else if (palabra == promosTitle) {
        return "aTocar-promos";

    } else if (palabra == contactTitle) {
        return "aTocar-contacto";

    } else if (palabra == ubicTitle) {
        return "aTocar-ubicacion";

    } else {
        alert("Cambiaste un anchor veni a main.js:48")
    }
}


let lastUsed = document.getElementById("ubication-title");

for(let aTocar of document.getElementsByClassName("aTocar")){
    aTocar.addEventListener("click", function(){
        document.getElementById(aTocar.id).classList.remove('anchorTocado')
        
    })
}

let observerMain = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting === true) {
 
    if (lastUsed.id != entries[0].target.id) {
      var theAnchor=traductor(entries[0].target.textContent);
      var theLastAnchor=traductor(lastUsed.textContent)
      document.getElementById(theAnchor).classList.add('anchorTocado')
      document.getElementById(theLastAnchor).classList.remove('anchorTocado')
      lastUsed = entries[0].target
    }
  }
},{threshold:0});

observerMain.observe(document.querySelector("#main-title"));
observerMain.observe(document.querySelector("#about-title"));
observerMain.observe(document.querySelector("#services-title"));
observerMain.observe(document.querySelector("#tips-title"));
observerMain.observe(document.querySelector("#promos-title"));
observerMain.observe(document.querySelector("#contact-title")); 
observerMain.observe(document.querySelector("#ubication-title"));


var x = window.matchMedia("(max-width: 990px)")

if (x.matches) { // If media query matches

    observerMain.disconnect()
} 




