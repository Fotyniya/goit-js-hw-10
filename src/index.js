import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 500;

const inputField = document.querySelector('#search-box');
const oneCountryFound = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

const valueOfSearching = inputField.addEventListener('input', debounce(onSearchCountries,DEBOUNCE_DELAY))

function onSearchCountries (name) {
    
    restcountriesApi(inputField.value)
        .then((data) => {
        
        if (data.length == 1) {
            console.log(data)
            let markupLang = '';
            const markup = data.map (data => {
                console.log(data.languages)
                for (let i=0;i<= data.languages.length;i+=1){
                 console.log(data.languages[i].name)
                 markupLang += `<p>Languages: ${data.languages[i].name}</p>`
                }
            return `<h2><img src="${data.flags.svg}" alt="flags" width = '30'>  ${data.name}</h2>
            <p>Capital: ${data.capital}</p>
            <p>Population: ${data.population}</p>
            ${markupLang}`}).join();

            oneCountryFound.insertAdjacentHTML('afterbegin', markup)
            
        } else if (data.length >= 2 & data.length <= 10){
           
            const markup = data.map (data => {return `<h2><img src="${data.flags.svg}" alt="flags" width = '30'>  ${data.name}</h2>`}).join();
            
            countryList.insertAdjacentHTML('afterbegin', markup)
        } 
        else {
            Notify.warning("Too many matches found. Please enter a more specific name.");
        } 
    })   
}

function restcountriesApi (name) {
    const BASE_URL = 'https://restcountries.com/v2';
    return fetch(`${BASE_URL}/name/${(inputField.value).trim()}?fields=name,capital,population,flags,languages`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(Notify.warning("Oops, there is no country with that name"));
            }
            return resp.json();
        }
    ); 
}
