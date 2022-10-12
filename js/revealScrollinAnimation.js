const services = document.getElementsByClassName("reveal");

let observerReveal = new IntersectionObserver(async function (entries) {
  if (entries[0].isIntersecting === true ) {
    setServicios()
  }
},{threshold:0.1});



observerReveal.observe(document.getElementById("servicios"));
async function setServicios(){
  let cont = 800;
  for(let elemen of services){
    setTimeout(() => {
      elemen.classList.add("active");
    }, cont)
    cont+=250;
  }
  observerReveal.disconnect()
}
