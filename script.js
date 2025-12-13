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



// forms

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





// const countrySelect = document.querySelector('select[name="country"]');

// const countriesList = [
//     "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", 
//     "Antigua and Barbuda", "Argentina", "Armenia", "Australia", 
//     "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", 
//     "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
//     "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", 
//     "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", 
//     "Cambodia", "Cameroon", "Canada", "Central African Republic", 
//     "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", 
//     "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
//     "Denmark", "Djibouti", "Dominica", "Dominican Republic", 
//     "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
//     "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", 
//     "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", 
//     "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
//     "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", 
//     "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
//     "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", 
//     "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", 
//     "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", 
//     "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
//     "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", 
//     "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
//     "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
//     "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
//     "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", 
//     "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", 
//     "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
//     "Paraguay", "Peru", "Philippines", "Poland", "Portugal", 
//     "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
//     "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", 
//     "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
//     "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", 
//     "Slovenia", "Solomon Islands", "Somalia", "South Africa", 
//     "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", 
//     "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", 
//     "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", 
//     "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
//     "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
//     "United Kingdom", "United States", "Uruguay", "Uzbekistan", 
//     "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", 
//     "Zambia", "Zimbabwe"
// ].sort();

// // Заполняем select
// countriesList.forEach(country => {
//   const option = document.createElement('option');
//   option.value = country.toLowerCase().replace(/\s+/g, '-');
//   option.textContent = country;
//   countrySelect.appendChild(option);
// });

// // Валидаторы
// const validators = {
//   fullName: v => v.length < 3 ? 'Min 3 chars' : null,
//   telegram: v => v && !v.startsWith('@') ? 'Start with @' : null,
//   email: v => v && !/^\S+@\S+\.\S+$/.test(v) ? 'Invalid email' : null,
//   country: v => !v ? 'Required' : null,
//   source: v => v && !/^0x[a-fA-F0-9]{40}$/.test(v) ? 'Invalid wallet' : null 
// };

// // Показ ошибок
// function showError(input, msg) {
//   const label = input.closest('label');
//   const errorEl = label.querySelector('.error');
//   if (errorEl) errorEl.textContent = msg;
//   label.classList.add('has-error');
// }

// function clearError(input) {
//   const label = input.closest('label');
//   const errorEl = label.querySelector('.error');
//   if (errorEl) errorEl.textContent = '';
//   label.classList.remove('has-error');
// }

// // Валидация формы
// function validateForm() {
//   const form = document.getElementById('whiteListForm');
//   let isValid = true;

//   ['fullName', 'telegram', 'email', 'country', 'source'].forEach(name => {
//     const input = form.querySelector(`[name="${name}"]`);
//     const value = input.value.trim();
//     const error = validators[name] ? validators[name](value) : null;

//     if (error) {
//       showError(input, error);
//       isValid = false;
//     } else {
//       clearError(input);
//     }
//   });

//   // Проверка
//   const telegram = form.querySelector('[name="telegram"]').value.trim();
//   const email = form.querySelector('[name="email"]').value.trim();

//   if (!telegram && !email) {
//     const tgInput = form.querySelector('[name="telegram"]');
//     const emailInput = form.querySelector('[name="email"]');
//     showError(tgInput, 'Fill Telegram or Email');
//     showError(emailInput, 'Fill Telegram or Email');
//     isValid = false;
//   }

//   return isValid;
// }

// // Реал-тайм валидация
// document.querySelectorAll('.contact-form-input-popup').forEach(input => {
//   input.addEventListener('blur', () => {
//     const value = input.value.trim();
//     const error = validators[input.name] ? validators[input.name](value) : null;
//     error ? showError(input, error) : clearError(input);
//   });

//   input.addEventListener('input', () => {
//     if (input.closest('label').classList.contains('has-error')) {
//       const value = input.value.trim();
//       if (!validators[input.name](value)) clearError(input);
//     }
//   });
// });

// // Отправка формы
// document.getElementById('whiteListForm').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   if (!validateForm()) return;

//   const formData = new FormData(e.target);
//   const data = Object.fromEntries(formData.entries());

//   const button = e.target.querySelector('button[type="submit"]');
//   const originalText = button.textContent;
//   button.textContent = 'Sending...';
//   button.disabled = true;

//   try {
//     const response = await fetch('https://api.emyo.io/api/1.0/form/white-list', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });

//     if (!response.ok) throw new Error('Server error');

//     e.target.reset();
//     document.querySelectorAll('.contact-form-input-popup').forEach(clearError);

//     closePopup();
//     showPopupSuccses();

//   } catch (error) {
//     alert('Error: ' + error.message);
//   } finally {
//     button.textContent = originalText;
//     button.disabled = false;
//   }
// });



document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.querySelector('#whiteListForm select[name="country"]');
    const customSelect = document.querySelector('#whiteListForm .custom-select');
    const customSelectText = document.querySelector('#whiteListForm .custom-select-text');
    const customOptions = document.querySelector('#whiteListForm .custom-options');
    const form = document.getElementById('whiteListForm');

    if (!countrySelect || !customSelect || !customSelectText || !customOptions || !form) {
        console.error('Не найдены необходимые элементы DOM');
        return;
    }

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

    
    customOptions.innerHTML = '';
    countrySelect.innerHTML = '<option value="" disabled selected>COUNTRY</option>';
    
    countriesList.forEach(country => {
        // Опции для кастомного селекта
        const customOption = document.createElement('div');
        customOption.className = 'custom-option';
        customOption.textContent = country;
        customOption.dataset.value = country.toLowerCase().replace(/\s+/g, '-');
        customOptions.appendChild(customOption);
        
        // Опции для скрытого select
        const hiddenOption = document.createElement('option');
        hiddenOption.value = country.toLowerCase().replace(/\s+/g, '-');
        hiddenOption.textContent = country;
        countrySelect.appendChild(hiddenOption);
    });

    // 4. Управление кастомным селектом
    let isOpen = false;

    // Функция для открытия селекта
    function openCustomSelect() {
        if (isOpen) return;
        
        isOpen = true;
        customSelect.classList.add('open');
        customOptions.classList.add('show');
        
        // Сброс активной опции
        customOptions.querySelectorAll('.custom-option').forEach(opt => {
            opt.classList.remove('active');
        });
    }

    // Функция для закрытия селекта
    function closeCustomSelect() {
        if (!isOpen) return;
        
        isOpen = false;
        customSelect.classList.remove('open');
        customOptions.classList.remove('show');
    }

    // Переключатель открытия/закрытия
    function toggleCustomSelect() {
        if (isOpen) {
            closeCustomSelect();
        } else {
            openCustomSelect();
        }
    }

    // Обработчик клика на кастомном селекте
    customSelect.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleCustomSelect();
    });

    // Обработчик клика на опции
    customOptions.addEventListener('click', function(e) {
        const option = e.target.closest('.custom-option');
        if (!option) return;
        
        e.stopPropagation();
        
        const value = option.dataset.value;
        const text = option.textContent;
        
        // Обновляем отображаемый текст
        customSelectText.textContent = text;
        customSelectText.classList.remove('placeholder');
        
        // Обновляем скрытый select
        countrySelect.value = value;
        
        // Добавляем событие change для валидации
        const changeEvent = new Event('change', { bubbles: true });
        countrySelect.dispatchEvent(changeEvent);
        
        // Обновляем выделение
        customOptions.querySelectorAll('.custom-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
        
        // Закрываем меню
        closeCustomSelect();
        
        // Очищаем ошибку у поля страны если была
        clearError(countrySelect);
        
        // Принудительно запускаем валидацию
        const validator = validators.country;
        const error = validator ? validator(value) : null;
        if (error) {
            showError(countrySelect, error);
        } else {
            clearError(countrySelect);
        }
    });

    // Закрытие при клике вне селекта
    document.addEventListener('click', function(e) {
        if (!customSelect.contains(e.target) && !customOptions.contains(e.target)) {
            closeCustomSelect();
        }
    });

    // 5. ВАЛИДАЦИЯ ПОЛЕЙ
    const validators = {
        fullName: v => {
            if (!v || v.trim().length < 3) return 'Min 3 chars';
            return null;
        },
        telegram: v => {
            if (!v || v.trim() === '') return 'Telegram is required';
            if (!v.startsWith('@')) return 'Telegram must start with @';
            return null;
        },
        email: v => {
            if (!v || v.trim() === '') return 'Email is required';
            if (!/^\S+@\S+\.\S+$/.test(v)) return 'Invalid email format';
            return null;
        },
        country: v => {
            if (!v || v === '') return 'Country is required';
            return null;
        },
        source: v => {
            if (!v || v.trim() === '') return 'Wallet address is required';
            if (!/^0x[a-fA-F0-9]{40}$/.test(v.trim())) return 'Invalid wallet address';
            return null;
        }
    };

    // Показ ошибок
    function showError(input, msg) {
        const label = input.closest('label');
        const errorEl = label.querySelector('.error');
        if (errorEl) errorEl.textContent = msg;
        label.classList.add('has-error');
        input.classList.add('error-input');
    }

    function clearError(input) {
        const label = input.closest('label');
        const errorEl = label.querySelector('.error');
        if (errorEl) errorEl.textContent = '';
        label.classList.remove('has-error');
        input.classList.remove('error-input');
    }

    // Функция для получения значения поля
    function getFieldValue(name) {
        const input = form.querySelector(`[name="${name}"]`);
        if (!input) return '';
        
        // Для селекта страны получаем значение из скрытого select
        if (name === 'country') {
            return input.value || '';
        }
        
        return input.value ? input.value.trim() : '';
    }

    function validateForm() {
        let isValid = true;
        let firstErrorElement = null;

        ['fullName', 'telegram', 'email', 'country', 'source'].forEach(name => {
            const input = form.querySelector(`[name="${name}"]`);
            if (!input) return;
            
            const value = getFieldValue(name);
            const validator = validators[name];
            const error = validator ? validator(value) : null;

            if (error) {
                showError(input, error);
                isValid = false;
                
                if (!firstErrorElement) {
                    firstErrorElement = input.closest('label');
                }
            } else {
                clearError(input);
            }
        });

        if (firstErrorElement) {
            setTimeout(() => {
                firstErrorElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
        }

        return isValid;
    }

    // Реал-тайм валидация (при вводе)
    document.querySelectorAll('#whiteListForm .contact-form-input-popup').forEach(input => {
        if (input.name === 'country') {
            input.addEventListener('change', () => {
                const value = getFieldValue('country');
                const validator = validators[input.name];
                const error = validator ? validator(value) : null;
                error ? showError(input, error) : clearError(input);
            });
        } else {
            input.addEventListener('blur', () => {
                const value = getFieldValue(input.name);
                const validator = validators[input.name];
                const error = validator ? validator(value) : null;
                error ? showError(input, error) : clearError(input);
            });

            input.addEventListener('input', () => {
                const label = input.closest('label');
                if (label && label.classList.contains('has-error')) {
                    const value = getFieldValue(input.name);
                    const validator = validators[input.name];
                    const error = validator ? validator(value) : null;
                    if (!error) clearError(input);
                }
            });
        }
    });

    customSelect.addEventListener('click', function() {
        setTimeout(() => {
            const value = getFieldValue('country');
            const validator = validators.country;
            const error = validator ? validator(value) : null;
            if (error) {
                showError(countrySelect, error);
            } else {
                clearError(countrySelect);
            }
        }, 10);
    });

    // 6. ОТПРАВКА ФОРМЫ 
    document.getElementById('whiteListForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            // console.log('Валидация не пройдена - показаны все ошибки');
            return;
        }

        // 
        ('Валидация пройдена, отправка формы...');

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // console.log('Данные для отправки:', data);

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

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            // console.log('Ответ сервера:', result);

            // Сброс формы
            e.target.reset();
            
            customSelectText.textContent = 'COUNTRY';
            customSelectText.classList.add('placeholder');
            
            customOptions.querySelectorAll('.custom-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            countrySelect.value = '';
            
            // Очищаем все ошибки
            document.querySelectorAll('#whiteListForm .contact-form-input-popup').forEach(input => {
                clearError(input);
            });

            if (typeof closePopup === 'function') {
                closePopup();
            }
            if (typeof showPopupSuccses === 'function') {
                showPopupSuccses();
            } else {
                alert('Form submitted successfully!');
            }

        } catch (error) {
            console.error('Ошибка отправки:', error);
            alert('Error: ' + error.message);
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    });

    function initializeForm() {
        // Установка placeholder для кастомного селекта
        customSelectText.classList.add('placeholder');
        customSelect.setAttribute('tabindex', '0');
        
        customOptions.style.zIndex = '10000';
        
        // console.log('Form with custom select and validation initialized');
    }

    initializeForm();
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


// timer

// Конечная дата: 15 января 2026 года 00:00:00
  const targetDate = new Date('2026-01-15T00:00:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Если время вышло
    if (distance < 0) {
      document.querySelectorAll('.timer__block-number').forEach(el => el.textContent = '00');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

   
    document.querySelectorAll('.timer__block-number')[0].textContent = String(days).padStart(2, '0');
    document.querySelectorAll('.timer__block-number')[1].textContent = String(hours).padStart(2, '0');
    document.querySelectorAll('.timer__block-number')[2].textContent = String(minutes).padStart(2, '0');
    document.querySelectorAll('.timer__block-number')[3].textContent = String(seconds).padStart(2, '0');
  }


  updateTimer();
  setInterval(updateTimer, 1000);

