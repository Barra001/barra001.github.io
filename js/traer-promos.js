/*
async function reqListener() {
  let avisoPromo = document.getElementById("avisoPromos")
  let response = this.responseText;
  let rows = response.split("*")

  rows.pop();
  if(rows.length < 1){
    avisoPromo.innerHTML='<p style="font-size: 20px;">No hay promociones en este momento.</p>'
    return;

  }
  avisoPromo.style.display = "none";
  let cards = document.getElementsByClassName("card")
  
  for (let cont = 0;cont<rows.length;cont=cont+1) {
    let categorys = rows[cont].split("-")
    cards[cont].parentElement.parentElement.classList.remove("not-loaded")
    cards[cont].innerHTML+='<div class="image subir"><img src="img/promo/discount-tagg.png" height="175" width="175"></div> <div class="image2 subir"><img height="175" src="img/promo/discount-tagg.png" ' +
    'width="175"></div> <h1 class="subir">'+categorys[1]+'</h1> <span class="d-block subir" style="line-height: 120%;">'+categorys[0]+'</span> ' +
    '<div class="mt-4 subir"><small>'+categorys[2]+'</small></div>';
  }

}

const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", "getPromos.php");
req.send();*/

