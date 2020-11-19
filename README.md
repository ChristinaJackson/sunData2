# Vitamin D Detector 
**This project is automatically deployed here: [Vitamin D Detector](https://gifted-nightingale-ac72ea.netlify.app/)**

## Description
The app uses the user selected skin type and the current UV Index for a location to determine the amount of time needed in the sun for the appropriate amount of daily vitamin D as determined by this [Chart](https://www.gbhealthwatch.com/Did-you-know-Get-VitD-Sun-Exposure.php)

## How it works
When a user submits the location and skin type data, the Mapbox API is used to to get the latitude and longitude of the searched location.
The coordinates are then used to search DarkSky API to determine current UV Index at the location. After determining UV Index, skin type is taken into account and either the amount of time needed to get vitamin D is returned or that the user cannot currently get vitamin D.

## Technologies
- HTML/CSS
- JavaScript 
- Axios
- Netlify
- AWS Lambda functions

## Features to be added
- Provide more information for user about the importance of vitamin D and how UV Index directly contributes to ability to get vitamin D
- Cache search results with an expiration time
- Better error handling

## Functions
```javascript
exports.handler = function(event, context, callback){
    const {DARKSKY_KEY, DARKSKY_URL} = process.env
    const querystring = event.queryStringParameters;
    const searchValue = querystring.place    
    const MAPBOX_API_URL =
     `https://api.mapbox.com/geocoding/v5/mapbox.places/
    ${searchValue}.json?access_token=${MAPBOX_KEY}`
    const DARKSKY_URL = 
    `https://api.darksky.net/forecast/${DARKSKY_KEY}/
    ${lat},${lon}?exclude=daily,minutely,alerts,flags`
    const send = body =>{
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(body)
        }); 
    }


    async function getWeatherInfo(){
        let location = await axios.get(MAPBOX_API_URL)
        const info = location.data
        let lon =info.features[0].center[0];
        let lat =info.features[0].center[1];
        await axios.get(DARKSKY_URL)
        .then(res => send(res.data))
        .catch(err =>{
            console.log(err)
            console.log(err.response.data.error)
        })
    }


    if(event.httpMethod === 'GET'){
        getWeatherInfo()
    }
}
```