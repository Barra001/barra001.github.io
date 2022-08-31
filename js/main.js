
function isElementInViewport(el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}


function updMenuSelectedOption() {


    let sections = document.getElementsByClassName("optionMenu");
    let anchors = document.getElementsByClassName("aTocar")
    for (let index = 0; index < sections.length; index++) {
        let element = sections[index];
        if (isElementInViewport(element) == true) {
            for (let sndIndex = 0; sndIndex < anchors.length; sndIndex++) {
                let anchor = anchors[sndIndex];
                if (anchor.textContent.toLowerCase() == traductor(element.textContent)) {
                    if (!anchor.classList.contains("anchorTocado")) {
                        anchor.classList.add("anchorTocado")
                    }
                } else {
                    if (anchor.classList.contains("anchorTocado")) {
                        anchor.classList.remove("anchorTocado")
                    }
                }

            }

        }

    }
}

//Traduce encabecados a id de anchors para iluminarlos cuando el encabezado este visible
function traductor(palabra) {
    palabra = palabra.toLocaleLowerCase()
    palabra = palabra.trim()
    if (palabra == document.getElementById("main-title").innerText.toLocaleLowerCase()) {
        return "inicio";
    } else if (palabra == document.getElementById("about-title").innerText.toLocaleLowerCase()) {
        return "nosotras";

    } else if (palabra == document.getElementById("services-title").innerText.toLocaleLowerCase()) {
        return "servicios";

    } else if (palabra == document.getElementById("tips-title").innerText.toLocaleLowerCase()) {
        return palabra;

    } else if (palabra == document.getElementById("promos-title").innerText.toLocaleLowerCase()) {
        return palabra;

    } else if (palabra == document.getElementById("contact-title").innerText.toLocaleLowerCase()) {
        return "contacto";

    } else if (palabra == document.getElementById("ubication-title").innerText.toLocaleLowerCase()) {
        return palabra;

    } else {
        alert("Cambiaste un anchor veni a main.js:48")
    }
}

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 25;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}


$(document).ready(function () {
    "use strict";

    document.addEventListener("scroll", updMenuSelectedOption, { passive: true })

    document.addEventListener("scroll", reveal, { passive: true });


    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })


    //Stop boostrap carrousel in phones
    if ($(window).width() < 500) {
       
        $('.carousel').carousel({
            interval: false,
          });
    }

    //------- Mobile Nav  js --------//  

    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({
            id: 'mobile-nav'
        });
        $mobile_nav.append('<div id="mobile-nav-ex"><i class="bi bi-x" style="position:absolute; left:15%; bottom:18%;font-size:50px; pointer-events: none"></i></div>')
        $mobile_nav.find('> ul').attr({
            'class': '',
            'id': ''
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="bi bi-list"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="lnr lnr-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function (e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').fadeOut();
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function (e) {
            var container = $("#mobile-body-overly, .aTocar, #mobile-nav-ex");
            if (container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');

                    $('#mobile-body-overly').fadeOut();
                    $('#mobile-nav-toggle i').toggle();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }


    //------- Owl Carusel  js --------//

    $('.active-testimonial-carusel').owlCarousel({
        items: 3,
        loop: true,
        margin: 30,
        dots: true,
        autoplayHoverPause: true,
        smartSpeed: 150,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1,
            },
            768: {
                items: 2,
            },
            961: {
                items: 3,
            }
        }
    });


    //------- Google Map  js --------//  

    if (document.getElementById("map")) {
        google.maps.event.addEventListener(window, 'load', init);

        function init() {
            var mapOptions = {
                zoom: 11,
                center: new google.maps.LatLng(40.6700, -73.9400), // New York
                styles: [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#e9e9e9"
                    }, {
                        "lightness": 17
                    }]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }, {
                        "lightness": 20
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 17
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 29
                    }, {
                        "weight": 0.2
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 18
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 16
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }, {
                        "lightness": 21
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#dedede"
                    }, {
                        "lightness": 21
                    }]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#ffffff"
                    }, {
                        "lightness": 16
                    }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "saturation": 36
                    }, {
                        "color": "#333333"
                    }, {
                        "lightness": 40
                    }]
                }, {
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f2f2f2"
                    }, {
                        "lightness": 19
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#fefefe"
                    }, {
                        "lightness": 20
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#fefefe"
                    }, {
                        "lightness": 17
                    }, {
                        "weight": 1.2
                    }]
                }]
            };
            var mapElement = document.getElementById('map');
            var map = new google.maps.Map(mapElement, mapOptions);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(40.6700, -73.9400),
                map: map,
                title: 'Snazzy!'
            });
        }
    }

});

