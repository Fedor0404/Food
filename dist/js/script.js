'use strict';

import tabs from './modules/tabs';
import calc from './modules/calc';
import carts from './modules/carts';
import forms from './modules/forms';
import modal from './modules/modal';
import slides from './modules/sliders';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 40000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    calc();
    carts();
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    slides({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    timer('.timer', '2022-12-10');
});

