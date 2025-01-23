'use strict';

import langObj from './lang.js';
const NAME_REGEX = /^[A-Za-zА-Яа-яĄąĆćĘęŁłŃńÓóŚśŹźŻż\s'.-]+$/;
const hash = location.hash.substring(1);

// Scroll

const headerLinksWrap = document.getElementById('header__nav');

const headerLinksWrapClickHandler = event => {
    event.preventDefault();

    if (event.target.nodeName === 'A') {
        const targetId = event.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const screenWidth = window.innerWidth;

        if (targetElement) {
            const targetOffsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - (screenWidth <= 1440 ? 750 : 1400);

            window.scrollTo({
                top: targetOffsetTop,
                behavior: 'smooth'
            });
        }
    }
}

headerLinksWrap.addEventListener('click', headerLinksWrapClickHandler);

// Burger-menu
const body = document.querySelector('body');
const burgerMenu = document.querySelector('.header__burger-menu');
const burgerClose = document.querySelector('.header__burger-close');
const headerMenu = document.querySelector('.header__menu');
const headerBottom = document.querySelector('.header__bottom');
const headerButtons = document.querySelector('.header__buttons-wrap');
const headerLanguage = document.querySelector('.header__language');
const headerLanguageList = document.querySelector('.header__language-list');
const heroTitle = document.querySelector('.hero__title');
const heroImg = document.querySelector('.hero__img-wrap');

const toggleBurgerMenu = () => {
    body.classList.toggle('lock');
    burgerMenu.classList.toggle('header__burger-menu_invisible');
    burgerClose.classList.toggle('header__burger-close_visible');
    headerBottom.classList.toggle('header__bottom_visible');
    headerButtons.classList.toggle('header__buttons-wrap_mobile');
    headerLanguage.classList.toggle('header__language_mobile');
    headerLanguageList.classList.toggle('header__language-list_mobile');
    heroTitle.classList.toggle('hero__title_invisible');
}

const burgerMenuClickHandler = () => {
    toggleBurgerMenu();
    heroImg.classList.remove('hero__img-wrap_bottom');
    heroImg.classList.add('hero__img-wrap_top');
}

const burgerCloseClickHandler = () => {
    toggleBurgerMenu();
    heroImg.classList.remove('hero__img-wrap_top');
    heroImg.classList.add('hero__img-wrap_bottom');
}

const menuClickHandler = (event) => {
    (event.target.nodeName === 'A' || event.target.nodeName === 'LI') && burgerCloseClickHandler();
}

burgerMenu.addEventListener('click', burgerMenuClickHandler);
burgerClose.addEventListener('click', burgerCloseClickHandler);
headerMenu.addEventListener('click', menuClickHandler);


// Language-top
const dropdownWrapperTop = document.querySelector('.header__language_top');
const dropdownBtnTop = dropdownWrapperTop.querySelector('.header__language-btn_top');
const dropdownListTop = dropdownWrapperTop.querySelector('.header__language-list_top');
const dropdownInputTop = dropdownWrapperTop.querySelector('.header__language-input_hidden_top');
const dropdownWrapper = document.querySelector('.header__language');
const dropdownBtn = dropdownWrapper.querySelector('.header__language-btn');
const dropdownList = dropdownWrapper.querySelector('.header__language-list');
const dropdownInput = dropdownWrapper.querySelector('.header__language-input_hidden')
const allowedLanguages = ['ru', 'pl', 'ua'];

const btnClickHandlerTop = () => {
    dropdownListTop.classList.toggle('header__language-list_top_visible');
    dropdownBtnTop.classList.toggle('header__language-btn_top_active');
}

const changeLanguageUrl = (lng) => {
    const lang = lng.toLowerCase();
    location.href = `${location.pathname}#${lang}`;
    location.reload();
}

const changeLanguage = () => {
    if (!allowedLanguages.includes(hash)) {
        location.href = `${location.pathname}#ru`;
        location.reload();
    }
    dropdownBtnTop.innerText = hash.charAt(0).toUpperCase() + hash.slice(1).toLowerCase();
    dropdownBtn.innerText = hash.charAt(0).toUpperCase() + hash.slice(1).toLowerCase();
    dropdownInputTop.value = hash.charAt(0).toUpperCase() + hash.slice(1).toLowerCase();
    dropdownInput.value = hash.charAt(0).toUpperCase() + hash.slice(1).toLowerCase();

    for (const key in langObj) {
        const element = document.querySelector(`.lng-${key}`);
        const translatedText = langObj[key][hash];
        if (element && translatedText) {
            element.innerHTML = translatedText;
            if (element.previousElementSibling && element.previousElementSibling.type === "checkbox") {
                element.previousElementSibling.setAttribute('value', translatedText);
            }
            if (element.nextElementSibling && element.nextElementSibling.getAttribute('placeholder') && element.nextElementSibling.name === "comments") {
                element.nextElementSibling.setAttribute('placeholder', langObj[key]['placeholder'][hash]);
            }
            if (element && element.type === "button") {
                const text = element.getAttribute('data-value');

                if (text) {
                    const cleanStr = text.replace(/\s+/g, ' ');
                    let translation = null;

                    if (element.classList.contains('pesel-meldunk')) {
                        const regex = /,\s*(?![^()]*\))/;
                        const resultArray = cleanStr.split(regex);

                        translation = resultArray.map(item => {
                            for (const key in langObj) {
                                if (Object.values(langObj[key]).includes(item)) {
                                    return langObj[key][hash] || item;
                                }
                            }
                            return item;
                        });
                    } else {
                        for (const key in langObj) {
                            if (Object.values(langObj[key]).includes(cleanStr)) {
                                translation = langObj[key][hash];
                                break;
                            }
                        }
                    }

                    element.setAttribute('data-value', translation);
                }
                
            }
        }
    }
}

changeLanguage();

const itemClickHandlerTop = (event) => {
    const selectedLanguage = event.target.innerText;

    dropdownListTop.classList.remove('header__language-list_top_visible');
    dropdownList.classList.remove('header__language-list_visible');

    changeLanguageUrl(selectedLanguage);
}

const documentClickHandlerTop = (event) => {
    const isClickInsideDetails = servicesSelectInput.contains(event.target);
    const isClickInsideOrderServiceDetails = orderServiceSelectInput.contains(event.target);
    
    if (!isClickInsideDetails) {
        if (servicesSelectInput.open) {
            summary.click();
        }
    }

    if (!isClickInsideOrderServiceDetails) {
        if (orderServiceSelectInput.open) {
            orderServiceSummary.click();
        }
    }

    if ( event.target !== dropdownBtnTop ){
        dropdownBtnTop.classList.remove('header__language-btn_top_active');
        dropdownListTop.classList.remove('header__language-list_top_visible');
    }
    if ( event.target !== dropdownBtn ){
        dropdownBtn.classList.remove('header__language-btn_active');
        dropdownList.classList.remove('header__language-list_visible');
    }
    if (
        !phoneBtnTop.contains(event.target) &&
        event.target !== phoneBtnTop &&
        !phonePopover.contains(event.target) &&
        event.target !== phonePopover
    ) {
        phonePopover.classList.remove('active');
    }
    if (
        !phoneBtn.contains(event.target) &&
        event.target !== phoneBtn &&
        !phonePopoverBottom.contains(event.target) &&
        event.target !== phonePopoverBottom
    ) {
        phonePopoverBottom.classList.remove('active');
    }
}

const documentKeydownHandlerTop = (event) => {
    if (event.key === 'Tab' || event.key === 'Escape') {
        dropdownBtnTop.classList.remove('header__language-btn_top_active');
        dropdownListTop.classList.remove('header__language-list_top_visible');
        dropdownBtn.classList.remove('header__language-btn_active');
        dropdownList.classList.remove('header__language-list_visible');
        phonePopover.classList.remove('active');
        phonePopoverBottom.classList.remove('active');
    }
}

dropdownBtnTop.addEventListener('click', btnClickHandlerTop);
dropdownListTop.addEventListener('click', itemClickHandlerTop);
document.addEventListener('click', documentClickHandlerTop);
document.addEventListener('keydown', documentKeydownHandlerTop);


// Language

const btnClickHandler = () => {
    dropdownList.classList.toggle('header__language-list_visible');
    dropdownBtn.classList.toggle('header__language-btn_active');
}

const itemClickHandler = (event) => {
    const selectedLanguage = event.target.innerText;

    dropdownList.classList.remove('header__language-list_visible');
    dropdownListTop.classList.remove('header__language-list_top_visible');

    changeLanguageUrl(selectedLanguage);
}

dropdownBtn.addEventListener('click', btnClickHandler);
dropdownList.addEventListener('click', itemClickHandler);


// More-than counter
const moreThanSection = document.querySelector('.more-than');

const animateCounter = (counter) => {
    const value = +counter.getAttribute('data-value');
    let data = 0;
    const speed = 50;

    const increment = () => {
        const time = value / speed;
        if (data < value) {
            data++;
            counter.innerText = data;
            setTimeout(increment, time);
        }
    };

    increment();
}

const moreThanSectionClickHandler = event => {
    event.stopPropagation();

    if (event.target.classList.contains('more-than__text')) {
        animateCounter(event.target);
    }
}

moreThanSection.addEventListener('click', moreThanSectionClickHandler);


// Services-form
const servicesSelectInput = document.querySelector('.action-service__multiselect');
const summary = document.querySelector('summary');

const servicesClickHandler = () => {
    servicesSelectInput.classList.toggle('action-service__multiselect_active');
}

servicesSelectInput.addEventListener('click', servicesClickHandler);


// Details-accordion
const detailsAccordion = document.querySelector('.details__accordion-list');

const detailsAccordionClickHandler = event => {
    if (event.target.nodeName === 'svg' || event.target.nodeName === 'use') {
        if (event.target.nodeName === 'svg' && event.target.classList.contains('details__accordion-icon')) {
            const detailsControl = event.target.parentElement;
            const detailsContent = detailsControl.nextElementSibling;

            detailsControl.classList.toggle('open');

            if (detailsControl.classList.contains('open')) {
                detailsControl.setAttribute('aria-expanded', true);
                detailsContent.setAttribute('aria-hidden', false);
                detailsContent.style.maxHeight = '100%';
            } else {
                detailsControl.setAttribute('aria-expanded', false);
                detailsContent.setAttribute('aria-hidden', true);
                detailsContent.style.maxHeight = null;
            };
        }

        if (event.target.nodeName === 'use' && event.target.parentElement.classList.contains('details__accordion-icon')) {
            const detailsControl = event.target.parentElement.parentElement;
            const detailsContent = detailsControl.nextElementSibling;

            detailsControl.classList.toggle('open');

            if (detailsControl.classList.contains('open')) {
                detailsControl.setAttribute('aria-expanded', true);
                detailsContent.setAttribute('aria-hidden', false);
                detailsContent.style.maxHeight = '100%';
            } else {
                detailsControl.setAttribute('aria-expanded', false);
                detailsContent.setAttribute('aria-hidden', true);
                detailsContent.style.maxHeight = null;
            };
        }
    }
}

detailsAccordion.addEventListener('click', detailsAccordionClickHandler);


// Stages-accordion
const stagesAccordion = document.querySelector('.details__accordion-sublist');

const stagesAccordionClickHandler = event => {
    if (event.target.nodeName === 'svg' || event.target.nodeName === 'use') {
        const stagesControl = event.target.nodeName === 'svg' ? event.target.parentElement : event.target.parentElement.parentElement;
        const stagesContent = stagesControl.nextElementSibling;

        stagesControl.classList.toggle('show');

        if (stagesControl.classList.contains('show')) {
            stagesControl.setAttribute('aria-expanded', true);
            stagesContent.setAttribute('aria-hidden', false);
            stagesContent.style.maxHeight = '100%';
        } else {
            stagesControl.setAttribute('aria-expanded', false);
            stagesContent.setAttribute('aria-hidden', true);
            stagesContent.style.maxHeight = null;
        };
    }
}

stagesAccordion.addEventListener('click', stagesAccordionClickHandler);


// Substages-accordion
const subStagesAccordion = document.querySelector('.details__accordion-sublist');

const subStagesAccordionClickHandler = event => {
    if (event.target.nodeName === 'svg' || event.target.nodeName === 'use' || (event.target.nodeName === 'DIV' && event.target.classList.contains('details__subitem-item-icon'))) {
        const stagesControl = event.target.nodeName === 'svg' ? event.target.parentElement.parentElement : event.target.nodeName === 'use' ? event.target.parentElement.parentElement.parentElement : event.target.parentElement;
        const stagesContent = stagesControl.nextElementSibling;

        stagesControl.classList.toggle('show');

        if (stagesControl.classList.contains('show')) {
            stagesControl.setAttribute('aria-expanded', true);
            stagesContent.setAttribute('aria-hidden', false);
            stagesContent.style.maxHeight = '100%';
        } else {
            stagesControl.setAttribute('aria-expanded', false);
            stagesContent.setAttribute('aria-hidden', true);
            stagesContent.style.maxHeight = null;
        };
    }
}

subStagesAccordion.addEventListener('click', subStagesAccordionClickHandler);


// Nothing-impossible swiper

const nothingImpossibleSwiper = new Swiper('.swiper-container', {
    speed: 1400,
    spaceBetween: 16,
    loop: true,

    breakpoints: {
        360: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
        1440: {
            slidesPerView: 4,
        }
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


// Nothing-impossible expanding cards
const cards = document.querySelector(".swiper-wrapper.cards");
const sliderCards = document.querySelectorAll(".card");

const removeClass = (array, className) => {
    array.forEach((elem) => {
        elem.classList.remove(className);
    });
};

const cardsSwiperClickHandler = (event) => {

    if ((event.target.nodeName === 'svg' || event.target.nodeName === 'use') && event.target.classList.contains('info__icon-right')) {
        
        removeClass(sliderCards, 'active');

        const card = event.target.nodeName === 'svg' ? event.target.parentElement.parentElement.parentElement : event.target.parentElement.parentElement.parentElement.parentElement;

        const index = card.getAttribute('data-swiper-slide-index');

        card.classList.add('active');
    
        const cardWidth = card.scrollWidth;

        const screenWidth = window.innerWidth;
        let leftValue = null;

        if (screenWidth <= 1439) {
            leftValue = null;
        } else {
            leftValue = `-${cardWidth * (index) - 160}px`;
        }

        cards.style.left = leftValue;
    }

    if ((event.target.nodeName === 'svg' || event.target.nodeName === 'use') && event.target.classList.contains('info__icon-left')) {

        removeClass(sliderCards, 'active');

        const card = event.target.nodeName === 'svg' ? event.target.parentElement.parentElement.parentElement : event.target.parentElement.parentElement.parentElement.parentElement;

        const index = card.getAttribute('data-swiper-slide-index');

        card.classList.remove('active');
    
        const cardWidth = card.scrollWidth;
        
        cards.style.left = null;
    }
}

cards.addEventListener('click', cardsSwiperClickHandler);


// Nothing-impossible video-modal

Fancybox.bind("[data-fancybox]", {
  type: 'iframe',
  iframe: {
    preload: false,
  }
});


// Feedbacks-swiper

const feedbacksSwiper = new Swiper('.feedbacks__swiper', {
    slidesPerView: 1,
    speed: 1400,
    spaceBetween: 150,

    navigation: {
        nextEl: '.feedbacks__swiper-button-next',
        prevEl: '.feedbacks__swiper-button-prev',
    },
});


// FAQ-accordion
const faqAccordion = document.querySelector('.faq__list');

const faqAccordionClickHandler = event => {
    if (event.target.nodeName === 'svg' || event.target.nodeName === 'use') {
        if (event.target.nodeName === 'svg') {
            const faqControl = event.target.parentElement;
            const faqContent = faqControl.nextElementSibling;

            faqControl.classList.toggle('open');

            if (faqControl.classList.contains('open')) {
                faqControl.setAttribute('aria-expanded', true);
                faqContent.setAttribute('aria-hidden', false);
                faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
            } else {
                faqControl.setAttribute('aria-expanded', false);
                faqContent.setAttribute('aria-hidden', true);
                faqContent.style.maxHeight = null;
            };
        }

        if (event.target.nodeName === 'use') {
            const faqControl = event.target.parentElement.parentElement;
            const faqContent = faqControl.nextElementSibling;

            faqControl.classList.toggle('open');

            if (faqControl.classList.contains('open')) {
                faqControl.setAttribute('aria-expanded', true);
                faqContent.setAttribute('aria-hidden', false);
                faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
            } else {
                faqControl.setAttribute('aria-expanded', false);
                faqContent.setAttribute('aria-hidden', true);
                faqContent.style.maxHeight = null;
            };
        }
    }
}

faqAccordion.addEventListener('click', faqAccordionClickHandler);


//  Phone popover
const phoneBtnTop = document.querySelector('.header__phone-btn_top');
const phoneBtn = document.querySelector('.header__phone-btn');
const phonePopover = document.querySelector('.header__phone-popover');
const phonePopoverBottom = document.querySelector('.header__phone-popover-bottom');

const phonePopoverClickHandler = event => {
    if (phonePopover.contains(event.target)) return;
    phonePopover.classList.toggle('active');
}

const phonePopoverBottomClickHandler = event => {
    if (phonePopoverBottom.contains(event.target)) return;
    phonePopoverBottom.classList.toggle('active');
}

phoneBtnTop.addEventListener('click', phonePopoverClickHandler);
phoneBtn.addEventListener('click', phonePopoverBottomClickHandler);


// Free-advice form + modal

const freeAdviceModal = new bootstrap.Modal(document.getElementById('freeAdvice'));
const freeAdviceForm = document.getElementById('freeAdvice-form');
const freeAdviceNameInput = document.getElementById('freeAdvice-name');
const freeAdvicePhoneInput = document.getElementById('freeAdvice-phone');
const errorPhoneMsg = document.querySelector("#error-phone-msg");
const errorNameMsg = document.querySelector("#error-name-msg");
const freeAdviceCloseBtn = document.querySelector('.freeAdvice-modal__close-icon');


const itiPhoneInput = window.intlTelInput(freeAdvicePhoneInput, {
    initialCountry: "pl",
    showSelectedDialCode: true,
    onlyCountries: ["pl", "ru", "ua"],
    countrySearch: false,
});

const phoneMaskOptions = {
  mask: '000-000-000',
};

const phoneMask = IMask(freeAdvicePhoneInput, phoneMaskOptions);

const resetName = () => {
  freeAdviceNameInput.parentElement.classList.remove("error");
  errorNameMsg.innerHTML = "";
};

const resetPhone = () => {
  freeAdvicePhoneInput.parentElement.parentElement.classList.remove("error");
  errorPhoneMsg.innerHTML = "";
};

const showError = (msg, isName, isPhone) => {
    if (isName) {
        freeAdviceNameInput.parentElement.classList.add("error");
        errorNameMsg.innerHTML = msg;
    };
    if (isPhone) {
        freeAdvicePhoneInput.parentElement.parentElement.classList.add("error");
        errorPhoneMsg.innerHTML = msg;
    };
};

const validateName = (name) => {
  if (!name.trim()) {
    const validMsg = {
        ru: "Обязательное поле",
        pl: "Pole obowiązkowe",
        ua: "Обов'язкове поле",
    }
    showError(validMsg[hash], true, false);
    return false;
  } else if (name.length < 2) {
    const validMsg = {
        ru: "Имя должно содержать не менее 2 символов",
        pl: "Nazwa musi składać się z co najmniej 2 znaków",
        ua: "Ім'я повинно містити не менше 2 символів",
    }
    showError(validMsg[hash], true, false);
    return false;
  } else if (name.length > 64) {
    const validMsg = {
        ru: "Имя должно содержать не более 64 символов",
        pl: "Nazwa nie może zawierać więcej niż 64 znaki",
        ua: "Ім'я має містити не більше 64 символів",
    }
    showError(validMsg[hash], true, false);
    return false;
  } else if (!NAME_REGEX.test(name)) {
    const validMsg = {
        ru: "Имя должно содержать только латинские, польские буквы, кириллицу или специальные символы: '.-",
        pl: "Nazwa musi zawierać wyłącznie łacińskie, polskie litery, cyrylicę lub znaki specjalne: '.-",
        ua: "Ім'я має містити тільки латинські, польські літери, кирилицю або спеціальні символи: '.-",
    }
    showError(validMsg[hash], true, false);
    return false;
  }
  return true;
};

const validatePhone = (phone) => {
  if (!phone.trim()) {
    const validMsg = {
        ru: "Обязательное поле",
        pl: "Pole obowiązkowe",
        ua: "Обов'язкове поле",
    }
    showError(validMsg[hash], false, true);
    return false;
  } else if (phone.length < 9) {
    const validMsg = {
        ru: "Номер телефона должен состоять из 9 символов",
        pl: "Numer telefonu musi składać się z 9 znaków",
        ua: "Номер телефону повинен складатися з 9 символів",
    }
    showError(validMsg[hash], false, true);
    return false;
  }
  return true;
};

const freeAdviceCloseBtnClickHandler = () => {
    resetName();
    resetPhone();
    freeAdviceNameInput.value = '';
    freeAdvicePhoneInput.value = '';
}

const freeAdviceFormSubmitHandler = async (event) => {
    event.preventDefault();

    const name = freeAdviceNameInput.value;
    const phone = freeAdvicePhoneInput.value.replace(/\D/g, '');

    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);

    const dataToSend = {
        phone,
        name,
        countryCode: `+${itiPhoneInput.s.dialCode}`,
    }

    if (isNameValid && isPhoneValid) {
        await fetch('http://localhost:8081/api/v1/forms/cons', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .catch((error) => {
                throw new Error(error);
            })
            .finally(() => {
                freeAdviceNameInput.value = '';
                freeAdvicePhoneInput.value = '';
                freeAdviceModal.hide();
            });
    }
}

freeAdviceForm.addEventListener('submit', freeAdviceFormSubmitHandler);
freeAdvicePhoneInput.addEventListener('change', resetPhone);
freeAdvicePhoneInput.addEventListener('keyup', resetPhone);
freeAdviceNameInput.addEventListener('change', resetName);
freeAdviceNameInput.addEventListener('keyup', resetName);
freeAdviceCloseBtn.addEventListener('click', freeAdviceCloseBtnClickHandler);


// Service select-inputs synchronisation
const checkboxes = document.querySelectorAll('input[type="checkbox"][name="select"]');
const orderServiceServiceOptions = document.getElementById('orderService__services-options');

let selectedServices = [];

const updateCheckboxState = () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectedServices.includes(checkbox.value);
  });
}

const displaySelectedServices = () => {
  orderServiceServiceOptions.innerHTML = "";

  const ul = document.createElement('ul');

  selectedServices.forEach(service => {
    const li = document.createElement('li');
    li.className = 'orderService-modal__services-option-wrap';
    li.innerHTML = `<div class="orderService-modal__services-option">
                        <svg class="orderService-modal__ellipse-icon" width="11" height="10">
                            <use xlink:href="assets/sprite.svg#ellipse"></use>
                        </svg>
                        <p class="orderService-modal__services-option-text">${service}</p>
                        </div>
                    <svg class="orderService-modal__option-close-icon">
                        <use xlink:href="assets/sprite.svg#close-icon"></use>
                    </svg>`;
    ul.appendChild(li);
  })

  orderServiceServiceOptions.appendChild(ul);
}

const handleCheckboxChange = (event) => {
    const checkbox = event.target;
    const value = checkbox.value;

    if (checkbox.checked) {
        if (!selectedServices.includes(value)) {
            selectedServices.push(value);
        }
    } else {
        const index = selectedServices.indexOf(value);
        if (index !== -1) {
            selectedServices.splice(index, 1);
        }
    }

    updateCheckboxState();
    displaySelectedServices();
    validateServices(selectedServices);
}

const serviceOptionsClickHandler = event => {
    if (event.target.nodeName === 'svg' || event.target.nodeName === 'use') {
        const closeIcon = event.target.nodeName === 'svg' ? event.target : event.target.parentElement;
        const option = closeIcon.previousElementSibling.lastElementChild;
        selectedServices = selectedServices.filter(service => service !== option.textContent);
        updateCheckboxState();
        displaySelectedServices();
    }
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckboxChange);
});
orderServiceServiceOptions.addEventListener('click', serviceOptionsClickHandler);


// Order-service form + modal
const orderServiceModal = new bootstrap.Modal(document.getElementById('orderService'));
const orderServiceForm = document.getElementById('orderService-form');
const orderServiceTextarea = document.getElementById('orderService-comments');
const orderServiceCounter = document.getElementById('orderService__textarea-counter');
const orderServiceSelectInput = document.querySelector('.orderService-modal__multiselect');
const orderServiceSummary = document.querySelector('.orderService-modal__summary');
const orderServicePhoneInput = document.getElementById('orderService-phone');
const orderServiceCommentsInput = document.getElementById('orderService-comments');
const orderServiceErrorServicesMsg = document.querySelector("#error-services-msg");
const orderServiceErrorPhoneMsg = document.querySelector('#error-phone-service-msg');
const orderServiceCloseBtn = document.querySelector('.orderService-modal__close-icon');

const itiOrderServicePhoneInput = window.intlTelInput(orderServicePhoneInput, {
    initialCountry: "pl",
    showSelectedDialCode: true,
    onlyCountries: ["pl", "ru", "ua"],
    countrySearch: false,
});

const phoneOrderServiceMask = IMask(orderServicePhoneInput, phoneMaskOptions);

const resetServices = () => {
  orderServiceServiceOptions.parentElement.classList.remove("error");
  orderServiceErrorServicesMsg.innerHTML = "";
};

const resetOrderServicePhone = () => {
  orderServicePhoneInput.parentElement.parentElement.classList.remove("error");
  orderServiceErrorPhoneMsg.innerHTML = "";
};

const showOrderServiceError = (msg, isService, isPhone) => {
    if (isService) {
        orderServiceServiceOptions.parentElement.classList.add("error");
        orderServiceErrorServicesMsg.innerHTML = msg;
    };
    if (isPhone) {
        orderServicePhoneInput.parentElement.parentElement.classList.add("error");
        orderServiceErrorPhoneMsg.innerHTML = msg;
    };
};

const validateServices = (services) => {
  if (!services.length) {
    const validMsg = {
        ru: "Обязательное поле",
        pl: "Pole obowiązkowe",
        ua: "Обов'язкове поле",
    }
    showOrderServiceError(validMsg[hash], true, false);
    return false;
  } else {
      resetServices();
  }
  return true;
};

const validateOrderServicePhone = (phone) => {
  if (!phone.trim()) {
    const validMsg = {
        ru: "Обязательное поле",
        pl: "Pole obowiązkowe",
        ua: "Обов'язкове поле",
    };
    showOrderServiceError(validMsg[hash], false, true);
    return false;
  } else if (phone.length < 9) {
    const validMsg = {
        ru: "Номер телефона должен состоять из 9 символов",
        pl: "Numer telefonu musi składać się z 9 znaków",
        ua: "Номер телефону повинен складатися з 9 символів",
    }
    showOrderServiceError(validMsg[hash], false, true);
    return false;
  }
  return true;
};

const orderServiceSelectInputClickHandler = () => {
    orderServiceSelectInput.classList.toggle('orderService-modal__multiselect_active');
}

const orderServiceTextareaInputHandler = event => {
    const { target } = event;

    const maxLength = target.getAttribute('maxlength');

    const currentLength = target.value.length;

    orderServiceCounter.innerHTML = `${currentLength}/${maxLength}`;
}

const orderServiceFormSubmitHandler = async (event) => {
    event.preventDefault();

    const phone = orderServicePhoneInput.value.replace(/\D/g, '');
    const comments = orderServiceCommentsInput.value.trim();

    const isServicesValid = validateServices(selectedServices);
    const isPhoneValid = validateOrderServicePhone(phone);

    const dataToSend = {
        phone,
        countryCode: `+${itiOrderServicePhoneInput.s.dialCode}`,
        services: selectedServices,
        comments,
    }

    if (isServicesValid && isPhoneValid) {
        await fetch('http://localhost:8081/api/v1/forms/services', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .catch((error) => {
                throw new Error(error);
            })
            .finally(() => {
                selectedServices = [];
                updateCheckboxState();
                displaySelectedServices();
                orderServicePhoneInput.value = '';
                orderServiceCommentsInput.value = '';
                orderServiceModal.hide();
            });
    }
}

const orderServiceCloseBtnClickHandler = () => {
    selectedServices = [];
    updateCheckboxState();
    displaySelectedServices();
    resetServices();
    orderServicePhoneInput.parentElement.parentElement.classList.remove("error");
    orderServiceErrorPhoneMsg.innerHTML = "";
    orderServicePhoneInput.value = "";
    orderServiceCommentsInput.value = "";
}

orderServiceSelectInput.addEventListener('click', orderServiceSelectInputClickHandler);
orderServiceForm.addEventListener('submit', orderServiceFormSubmitHandler);
orderServiceTextarea.addEventListener('input', orderServiceTextareaInputHandler);
orderServicePhoneInput.addEventListener('change', resetOrderServicePhone);
orderServicePhoneInput.addEventListener('keyup', resetOrderServicePhone);
orderServiceCloseBtn.addEventListener('click', orderServiceCloseBtnClickHandler);

// Price section
const priceSection = document.getElementById('price');

const priceSectionClickHandler = event => {
    event.stopPropagation();
    const regex = /,\s*(?![^()]*\))/;

    if (event.target.nodeName === 'BUTTON') {
        const button = event.target;
        const buttonValue = button.getAttribute('data-value');
        if (button.classList.contains('pesel-meldunk') ) {
            const resultArray = buttonValue.split(regex);
            selectedServices = [...resultArray]
        } else {
            selectedServices.push(buttonValue.replace(/\s{2,}/g, ' ').trim());
        }
        updateCheckboxState();
        displaySelectedServices();
    }
}

priceSection.addEventListener('click', priceSectionClickHandler);