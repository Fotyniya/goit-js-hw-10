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
    if (inputField.value){
        fetchCountries(inputField.value)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(Notify.failure("Oops, there is no country with that name"));
            }
            return resp.json();
        })
        .then((data) => {
            if (data.length == 1) {
                console.log(data)
                let markupLang = '';
                const markup = data.map (data => {
                    let lang =[]
                    for (let i = 0; i < data.languages.length; i += 1){
                       lang.push(` ${(data.languages)[i].name}`);
                       markupLang = `<p><span class = 'bold'>Languages:</span> ${lang}</p>`
                    }
                return `<h2 class = 'title'><img src="${data.flags.svg}" alt="flag" width = '30'>  ${data.name}</h2>
                <p><span class = 'bold'>Capital:</span> ${data.capital}</p>
                <p><span class = 'bold'>Population:</span> ${data.population}</p>
                ${markupLang}`}).join();
                console.log(markup)
                oneCountryFound.insertAdjacentHTML('afterbegin', markup)
                
            } else if (data.length >= 2 & data.length <= 10){
                const markup = data.map(data => {return `<h2 class = 'title'><img src="${data.flags.svg}" alt="flag" width = '30'>  ${data.name}</h2>`}).join('');
                console.log(markup)
                countryList.insertAdjacentHTML('afterbegin', markup)
            } 
            else if(data.length > 10){
                Notify.warning("Too many matches found. Please enter a more specific name.");
            } 
        })   
    } 
    oneCountryFound.innerHTML = "";
    countryList.innerHTML = "";
}
