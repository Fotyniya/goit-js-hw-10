function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v2';
    const responce = fetch(`${BASE_URL}/name/${(name).trim()}?fields=name,capital,population,flags,languages`);
    return responce
};

export { fetchCountries };