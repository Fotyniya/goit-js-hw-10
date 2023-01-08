import './css/styles.css';
import {fetchCountries} from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('#search-box');
const oneCountryFound = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

inputField.addEventListener('input', debounce(onSearchCountries, DEBOUNCE_DELAY))

function onSearchCountries (name) {
    onClearMarkup(); 
    const value = inputField.value.trim();
    if (!value){
        return
    } else {
        fetchCountries(value)
        .then((data) => {
            if (data.length == 1) {
                markupOneCountry(data)   
            } else if (data.length >= 2 & data.length <= 10){
                markupCountryList(data)
            } else if(data.length > 10){
                Notify.warning("Too many matches found. Please enter a more specific name.");
            } 
        }).catch(error => Notify.warning("Oops, there is no country with that name"))   
    }
};

function markupCountryList(data) {
    const markup = data.map(data => 
        {return `<h2 class = 'title'><img src="${data.flags.svg}" alt="flag" width = '30'>  ${data.name}</h2>`})
        .join('');
    countryList.insertAdjacentHTML('afterbegin', markup);   
};

function markupOneCountry(data) {
    let markupLang = '';
    const markup = data.map(data => {
    let lang =[]
    for (let i = 0; i < data.languages.length; i += 1){
        lang.push(` ${(data.languages)[i].name}`);
        markupLang = `<p><span class = 'bold'>Languages:</span> ${lang}</p>`
    }
    return `<h2 class = 'title'><img src="${data.flags.svg}" alt="flag" width = '30'>  ${data.name}</h2>
    <p><span class = 'bold'>Capital:</span> ${data.capital}</p>
    <p><span class = 'bold'>Population:</span> ${data.population}</p>
    ${markupLang}`}).join();            
    oneCountryFound.insertAdjacentHTML('afterbegin', markup)
};

function onClearMarkup() {
    oneCountryFound.innerHTML = "";
    countryList.innerHTML = "";    
}