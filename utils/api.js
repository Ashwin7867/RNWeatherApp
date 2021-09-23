export const fetchLocationId = async city => {
    const response = await fetch(`https://www.metaweather.com/api/location/search/?query=${city}`);
    const locations = await response.json();
    return locations[0].woeid;
}

export const fetchWeather = async woeid => {
    const response = await fetch(`https://www.metaweather.com/api/location/${woeid}/`);
    const { title, consolidated_weather } = await response.json();
    const { the_temp, weather_state_name } = consolidated_weather[0];
    return {
        location: title,
        temperature: the_temp,
        climate: weather_state_name
    }

}