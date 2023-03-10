export function fetchCountries(name) { 
    const BASE_URL = 'https://restcountries.com/v3.1';
    return fetch(`${BASE_URL}/name/${name}?fields=capital,population,languages,name,flags`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json();
        })
        .catch(err => {
            console.error(err);
    })
}


