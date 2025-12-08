// preloader
document.body.style.overflow = 'hidden';
const loader = () => {
    document.body.style.overflow = '';
    const preloader = document.getElementById('preloader');
    const fadeout = setInterval(() => {
        const opacity = getComputedStyle(preloader).opacity;
        opacity > 0 ? preloader.style.opacity = opacity - 0.1000 : (clearInterval(fadeout), preloader.remove());
    }, 15);
}

setTimeout(() => loader(), 2000);  


  
const classesToExclude = [
  ];

  function getCurrentScale() {
      const body = document.body;
      const transform = window.getComputedStyle(body).transform;
      if (transform && transform !== 'none') {
          const matrix = transform.match(/matrix\(([^)]+)\)/);
          if (matrix) {
              const values = matrix[1].split(',');
              return parseFloat(values[0]) || 1;
          }
      }
      return 1;
  }
  
  let currentScale = getCurrentScale();
  
  const lenis = new Lenis({
      duration: 2,                                            
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',                                  
      smoothWheel: true,                                        
      wheelMultiplier: 1,                                      
      touchMultiplier: 1.5,                                    
      infinite: false,                                          
      autoRaf: true,                                           
      autoResize: true,                                         
      syncTouch: false,                                         
      
      prevent: (node) => {
          return classesToExclude.some(className => 
              node.classList.contains(className) || 
              node.closest(`.${className}`)
          );
      },
      
      virtualScroll: (e) => {
          const newScale = getCurrentScale();
          
          if (newScale !== currentScale) {
              currentScale = newScale;
          }
          
          if (currentScale !== 1) {
              e.deltaY = e.deltaY / currentScale;
              e.deltaX = e.deltaX / currentScale;
          }
          
          return true; 
      }
  });
  
  let resizeTimeout;
  window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
          currentScale = getCurrentScale();
          lenis.resize(); 
      }, 100);
  });
  

  window.addEventListener('load', () => {
      classesToExclude.forEach((className) => {
          document.querySelectorAll(`.${className}`).forEach((element) => {
              element.setAttribute('data-lenis-prevent', '');
          });
      });
  });
  

  lenis.on('scroll', (e) => {
      // console.log('Scroll event:', e);
  });
  





  // partner slider
// const partnerSlider = new Swiper('#partner-slider', {
//     direction: 'horizontal',
//     // loop: true,

//     slidesPerView: 2.4,
//     spaceBetween: 13,
//     speed: 500,

//     breakpoints: {
        
//         1000: {
//           slidesPerView: 4,
//           spaceBetween: 13
//         },
//     },  
  
//     simulateTouch: true,
//     allowTouchMove: true,
//   });


  // insights slider

const insightsSlider = new Swiper('#insights-slider', {
    direction: 'horizontal',
    // loop: true,
    navigation: {
      nextEl: '.insights-button-next',
      prevEl: '.insights-button-prev',
    },

    slidesPerView: 1,
    spaceBetween: 13,
    speed: 500,

    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1000: {
            slidesPerView: 5,
        },
    },  
  
    simulateTouch: true,
    allowTouchMove: true,
});


// burger-menu

const burgerBtn = document.querySelector('.burger-btn');
const menu = document.querySelector('.menu');
const closeBtn = document.querySelector('.close-btn');
const body = document.body;
const menuLinks = document.querySelectorAll('.burger__list-link a');

burgerBtn.addEventListener('click', () => {
    menu.classList.add('active');
    body.classList.add('menu-open'); 
});

closeBtn.addEventListener('click', () => {
    menu.classList.remove('active');
    body.classList.remove('menu-open'); 
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        body.classList.remove('menu-open'); 
    });
});



gsap.registerPlugin(ScrollTrigger); 



//Fade-in

gsap.utils.toArray(".fade-in").forEach((element) => {
    gsap.from(element, {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none none", 
        },
    });
});


window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });



// popup

const buttonContact = document.querySelector('.header__button-contact');
const popupOverlay = document.getElementById("popup-overlay");
const popup = document.getElementById("popup");

function showPopup() {
  popupOverlay.classList.add('active');
  popup.classList.add('active');
}

function closePopup() {
  popupOverlay.classList.remove('active');
  popup.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(showPopup, 7000);
});



//forms

document.getElementById("whiteListForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const payload = {
    fullName: formData.get("fullName"),
    telegram: formData.get("telegram"),
    email: formData.get("email"),
    country: formData.get("country"),
    source: formData.get("source") || "" // необязательное поле
  };

  try {
    const response = await fetch("https://api.emyo.io/api/1.0/form/white-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Ошибка: " + response.status);
    }

    const result = await response.json();
    // alert("Заявка успешно отправлена!");
    showPopupSuccses();
    // console.log(result);
  } catch (error) {
    alert("Не удалось отправить заявку: " + error.message);
  }
});


const popupOverlaySuccses = document.getElementById("popup-overlay-succses");
const popupSuccses = document.getElementById("popup-succses");

function showPopupSuccses() {
  popupOverlaySuccses.style.display = "block";
  popupSuccses.style.display = "flex";

  setTimeout(() => {
        closePopupSuccses();  
    }, 5000);
    
}

function closePopupSuccses() {
  popupOverlaySuccses.style.display = "none";
  popupSuccses.style.display = "none";
}