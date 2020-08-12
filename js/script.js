//TODO:
//need a way to handle errors messages when server issues
//or with location issues
//provide feedback on location searched 
//accessible form,button and results
//bonus --> flowers, better sun

//this project calls two separate API's . The mapbox to get lat/long and then darksky weather based on the coords given
const dataDisplay = document.getElementById('peekABoo');
const searchForm = document.getElementById('searchForm');

//hides the data in the app until it has results to show
dataDisplay.style.display = 'none';

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    //once the form is submitted...sunApp goes to work
    getAllInfo();
})

async function getAllInfo() {
    const searchInput = document.getElementById('searchInput');
    const skinChoice = document.getElementById('skin');
    const searchValue = searchInput.value;
    let skin = parseInt(skinChoice.options[skinChoice.selectedIndex].value);
    await fetchWeatherInfo(searchValue)
        .then(data => {
            let uvIndex = data[0];
            let temp = data[1];
            let currentConditions = data[2];
            let timeToVitD = findTimeForVitamin(skin, uvIndex);
            let ballAnswer = magicBall(timeToVitD);
            changeDisplay(uvIndex, temp, currentConditions, timeToVitD, ballAnswer)
        })
};

//gets location data from mapbox API and then forwards the lat and long to the 
//darksky API, returns current weather info
async function fetchWeatherInfo(searchValue) {
    let finalData = await (await fetch(`/.netlify/functions/test?place=${searchValue}`)).json()
        // assigns values based on darkSky response
        .then(data => {
            let weatherInfoArray = [data.currently.uvIndex, Math.round(data.currently.temperature), data.currently.summary]
            return weatherInfoArray
        })
    return finalData
};

//changes display once all values are in
function changeDisplay(uvIndex, temp, summary, timeToVitD, ballAnswer) {
    const summarySpan = document.getElementById('summary');
    const ballSpan = document.getElementById('ballSpan');
    const timeSpan = document.getElementById('timeSpan');
    const toggleTime = document.getElementById('toggleTime')
    dataDisplay.style.display = 'block';
    tempSpan.textContent = temp;
    uvSpan.textContent = uvIndex;
    summarySpan.textContent = summary;
    ballSpan.textContent = ballAnswer;
    if (timeToVitD !== false) {
        timeSpan.textContent = timeToVitD;
        toggleTime.style.display = 'block';
    } else toggleTime.style.display = 'none';
}

//returns the time needed in the sun to get daily vitamin d...
// or false if you cant get vit d
const timeInSunMap = {
    // uvIndex 3-5          6-7 	  8-10 	     11+
    1: ["10-15 min", "5-10 min", "2-8 min", "1-5 min"],
    2: ["15-20 min", "10-15 min", "5-10 min", "2-8 min"],
    3: ["20-30 min", "15-20 min", "10-15 min", "5-10 min"],
    4: ["30-40 min", "20-30 min", "15-20 min", "10-15 min"],
    5: ["40-60 min", "30-40 min", "20-30 min", "15-20 min"]
};

function findTimeForVitamin(skin, uvIndex) {
    if (uvIndex >= 3 && uvIndex <= 5) {
        return timeInSunMap[`${skin}`][0];
    }
    else if (uvIndex >= 6 && uvIndex <= 7) {
        return timeInSunMap[`${skin}`][1];
    }
    else if (uvIndex >= 8 && uvIndex <= 10) {
        return timeInSunMap[`${skin}`][2];
    }
    else if (uvIndex >= 11) {
        return timeInSunMap[skin][3];
    }
    else {
        return false;
    }
};

//magic ball answers based on true/false values of timeToVitD()
function magicBall(timeToVitD) {
    const negativeResponses = ["Don't count on it.", "My reply is no.",
        "My sources say no.", "Very doubtful.", "Ha, nope."];
    const positiveResponse = ["It is certain.", "You may rely on it.",
        "As I see it, yes.", "Outlook good."];
    if (timeToVitD !== false) {
        let length = positiveResponse.length;
        let magicNumber = Math.floor(Math.random() * length);
        ballAnswer = positiveResponse[magicNumber];
        return ballAnswer
    } else {
        let length = negativeResponses.length;
        let magicNumber = Math.floor(Math.random() * length);
        ballAnswer = negativeResponses[magicNumber];
        return ballAnswer
    }
};