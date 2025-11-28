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

    slidesPerView: 1.3,
    spaceBetween: 13,
    speed: 500,

    breakpoints: {
        
        1000: {
          slidesPerView: 3.8,
          spaceBetween: 13
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