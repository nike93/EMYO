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

// document.getElementById("whiteListForm").addEventListener("submit", async function(e) {
//   e.preventDefault();

//   const formData = new FormData(this);
//   const payload = {
//     fullName: formData.get("fullName"),
//     telegram: formData.get("telegram"),
//     email: formData.get("email"),
//     country: formData.get("country"),
//     source: formData.get("source") || "" // необязательное поле
//   };

//   try {
//     const response = await fetch("https://api.emyo.io/api/1.0/form/white-list", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(payload)
//     });

//     if (!response.ok) {
//       throw new Error("Ошибка: " + response.status);
//     }

//     const result = await response.json();
//     // alert("Заявка успешно отправлена!");
//     showPopupSuccses();
//     // console.log(result);
//   } catch (error) {
//     alert("Не удалось отправить заявку: " + error.message);
//   }
// });





const countrySelect = document.querySelector('select[name="country"]');

const countriesList = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", 
    "Antigua and Barbuda", "Argentina", "Armenia", "Australia", 
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", 
    "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", 
    "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", 
    "Cambodia", "Cameroon", "Canada", "Central African Republic", 
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", 
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", 
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", 
    "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", 
    "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", 
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", 
    "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", 
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", 
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", 
    "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
    "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", 
    "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", 
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", 
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", 
    "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
    "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", 
    "Slovenia", "Solomon Islands", "Somalia", "South Africa", 
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", 
    "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", 
    "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", 
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", 
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", 
    "Zambia", "Zimbabwe"
].sort();

// Заполняем select
countriesList.forEach(country => {
  const option = document.createElement('option');
  option.value = country.toLowerCase().replace(/\s+/g, '-');
  option.textContent = country;
  countrySelect.appendChild(option);
});

// Валидаторы
const validators = {
  fullName: v => v.length < 3 ? 'Min 3 chars' : null,
  telegram: v => v && !v.startsWith('@') ? 'Start with @' : null,
  email: v => v && !/^\S+@\S+\.\S+$/.test(v) ? 'Invalid email' : null,
  country: v => !v ? 'Required' : null,
  source: v => v && !/^0x[a-fA-F0-9]{40}$/.test(v) ? 'Invalid wallet' : null 
};

// Показ ошибок
function showError(input, msg) {
  const label = input.closest('label');
  const errorEl = label.querySelector('.error');
  if (errorEl) errorEl.textContent = msg;
  label.classList.add('has-error');
}

function clearError(input) {
  const label = input.closest('label');
  const errorEl = label.querySelector('.error');
  if (errorEl) errorEl.textContent = '';
  label.classList.remove('has-error');
}

// Валидация формы
function validateForm() {
  const form = document.getElementById('whiteListForm');
  let isValid = true;

  ['fullName', 'telegram', 'email', 'country', 'source'].forEach(name => {
    const input = form.querySelector(`[name="${name}"]`);
    const value = input.value.trim();
    const error = validators[name] ? validators[name](value) : null;

    if (error) {
      showError(input, error);
      isValid = false;
    } else {
      clearError(input);
    }
  });

  // Проверка
  const telegram = form.querySelector('[name="telegram"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();

  if (!telegram && !email) {
    const tgInput = form.querySelector('[name="telegram"]');
    const emailInput = form.querySelector('[name="email"]');
    showError(tgInput, 'Fill Telegram or Email');
    showError(emailInput, 'Fill Telegram or Email');
    isValid = false;
  }

  return isValid;
}

// Реал-тайм валидация
document.querySelectorAll('.contact-form-input-popup').forEach(input => {
  input.addEventListener('blur', () => {
    const value = input.value.trim();
    const error = validators[input.name] ? validators[input.name](value) : null;
    error ? showError(input, error) : clearError(input);
  });

  input.addEventListener('input', () => {
    if (input.closest('label').classList.contains('has-error')) {
      const value = input.value.trim();
      if (!validators[input.name](value)) clearError(input);
    }
  });
});

// Отправка формы
document.getElementById('whiteListForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const button = e.target.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.textContent = 'Sending...';
  button.disabled = true;

  try {
    const response = await fetch('https://api.emyo.io/api/1.0/form/white-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Server error');

    e.target.reset();
    document.querySelectorAll('.contact-form-input-popup').forEach(clearError);

    closePopup();
    showPopupSuccses();

  } catch (error) {
    alert('Error: ' + error.message);
  } finally {
    button.textContent = originalText;
    button.disabled = false;
  }
});




const popupOverlaySuccses = document.getElementById("popup-overlay-succses");
const popupSuccses = document.getElementById("popup-succses");

function showPopupSuccses() {
  popupOverlaySuccses.style.display = "block";
  popupSuccses.style.display = "flex";

  closePopup();

  // setTimeout(() => {
  //     closePopupSuccses();  
  //   }, 5000);
    
}

function closePopupSuccses() {
  popupOverlaySuccses.style.display = "none";
  popupSuccses.style.display = "none";
}