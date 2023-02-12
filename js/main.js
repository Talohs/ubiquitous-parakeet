console.log('Hi')

let form = document.getElementById('weatherDaily')

async function handleFormSubmit(e){
    e.preventDefault();
    let countryName = e.target.countryName.value;
    let countryInfo = await getCountryInfo(countryName);
    buildCountryCard(countryInfo);
    e.target.countryName.value = '';
};

form.addEventListener('submit', handleFormSubmit);

async function getCountryInfo(countryName){
    var APIKey = '9ac2170dcabc4bf5a18191641232201'
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${countryName}&days=3&aqi=no&alerts=no`)
    let data = await response.json();
    console.log(data)
    return data
}

function buildCountryCard(countryObj){
    let card = document.createElement('div');
    card.className = 'card h-100';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let cityTitle = document.createElement('h5');
    cityTitle.className = 'card-title';
    cityTitle.innerHTML = 'City: '+countryObj.location.name+", "+countryObj.location.region;

    let cityTemp = document.createElement('h3');
    cityTemp.className = 'card-text';
    cityTemp.innerHTML = "Current: "+countryObj.current.temp_f;

    let cityFeel = document.createElement('h3');
    cityFeel.className = 'card-text';
    cityFeel.innerHTML = "Feels Like: "+countryObj.current.feelslike_f;

    let cityForeHigh = document.createElement('h3');
    cityForeHigh.className = 'card-text';
    cityForeHigh.innerHTML = "Forecast High: "+countryObj.forecast.forecastday[0]?.day.maxtemp_f;

    let cityForeLow = document.createElement('h3');
    cityForeLow.className = 'card-text';
    cityForeLow.innerHTML = "Forecast Low: "+countryObj.forecast.forecastday[0]?.day.mintemp_f;
    
    cardBody.append(cityTitle);
    cardBody.append(cityTemp);
    cardBody.append(cityFeel);
    cardBody.append(cityForeHigh);
    cardBody.append(cityForeLow)

    card.append(cardBody);

    let col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-3 my-3';

    col.append(card);

    let display = document.getElementById('cityDisplay');
    display.append(col);
};