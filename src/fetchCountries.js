function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v2';
    const responce = fetch(`${BASE_URL}/name/${(name)}?fields=name,capital,population,flags,languages`)
    .then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    })
    return responce
};

export { fetchCountries };