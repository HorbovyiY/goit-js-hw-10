import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';

import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() { 
    if (input.value.trim() === '') {
        list.innerHTML = '';
        info.innerHTML = '';
        return
    }
    fetchCountries(input.value.trim()).then(data => createMarkup(data)).catch(err => createErr(err));
}

function createErr(err) { 
    list.innerHTML = '';
    info.innerHTML = '';
    Notiflix.Notify.failure("Oops, there is no country with that name");
    console.log(err);
}

function createMarkup(arr) { 
    if (arr.length > 10) { 
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        list.innerHTML = '';
        info.innerHTML = '';
    };

    if (arr.length >= 2 && arr.length <= 10) { 
        const markup = arr.map(({ capital, flags: { svg }, languages, name: { official }, population
        }) => `<li><img src="${svg}" alt="flag of ${official}" width=40px> ${official} </li>`);
        list.innerHTML = markup.join('');
        info.innerHTML = '';
        list.style.listStyle = 'none';
    };
    
    if (arr.length === 1) {
        const markup = arr.map(({ capital, flags: { svg }, languages, name: { official }, population
        }) => `<div><img src="${svg}" alt="flag of ${official}" width=80px> <span style="font-size: 40px;">${official}</span></div>
        <span><b>Capital:</b> ${capital}</span>
        <span><b>Population:</b> ${population}</span>
        <span><b>Languages:</b> ${Object.values(languages).join(', ')}</span>`);
        info.innerHTML = markup.join('');
        list.innerHTML = '';
        info.style.display = 'flex';
        info.style.flexDirection = 'column';
    }
}