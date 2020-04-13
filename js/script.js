//this project calls two separate API's . The mapbox to get coords and then darksky weather based on the coords given
const dataDisplay =document.getElementById('peekABoo');
const searchForm = document.getElementById('searchForm')
const submitButton = document.getElementById('submitButton');

//hides the data in the app until it has results to show
dataDisplay.style.display ='none';

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    //once the form is submitted...sunApp goes to work
    getAllInfo();
})

async function getAllInfo(){
    const searchInput = document.getElementById('searchInput');
    const skinChoice = document.getElementById('skin');

    //clean this user input somehow 
    const searchValue = searchInput.value;
    //pulls data from form on skin type, assigns to allData 
    allData.skin = parseInt(skinChoice.options[skinChoice.selectedIndex].value)
    await fetchLocation(searchValue)
    //assigns the timetoVitD value in the allData object to the result of calling findTimeForVitD function
    allData.timeToVitD = findTimeForVitamin(allData.skin,allData.uvIndex)
    //assigns ballanswer value in all data to the result of calling magicball()
    allData.ballAnswer = magicBall(allData.skin, allData.timeToVitD) 
    changeDisplay()
};

 //gets location data from mapbox API and then forwards the lat and long to the 
    //darksky API in the "backend?" returns current weather info in json format
 async function fetchLocation(searchValue){
     let data = await(await fetch(`/.netlify/functions/test?place=${searchValue}`)).json()
    //assigns values based on darkSky response
      .then(data =>{
            allData.uvIndex = data.currently.uvIndex;
            allData.temp = Math.round(data.currently.temperature);
            allData.summary = data.currently.summary;      
})
};

//----------------------------------------What is this even----------->
//-----it works though :) -------------
let allData = {
    skin : getAllInfo.skin,  
    uvIndex : fetchLocation.uvIndex,
    temp: fetchLocation.temp,
    summary :fetchLocation.summary,
    timeToVitD: getAllInfo.timeToVitD,
    ballAnswer: getAllInfo.ballAnswer
}

//changes display once all values are in
function changeDisplay(){
    const summarySpan = document.getElementById('summary');
    const ballSpan = document.getElementById('ballSpan');
const timeSpan = document.getElementById('timeSpan');
const toggleTime = document.getElementById('toggleTime')
    dataDisplay.style.display ='block';
    tempSpan.textContent = allData.temp;
    // uvSpan.textContent = allData.uvIndex;
    summarySpan.textContent = allData.summary;
    ballSpan.textContent = allData.ballAnswer;
    //TODO - not finished -- will not show time to vit d if you cannot get vit D at the momenent 
    if(allData.timeToVitD !== false){
        timeSpan.textContent = allData.timeToVitD;
        toggleTime.style.display ='block';
    }else 
        toggleTime.style.display ='none';
        // console.log(allData)
    }

//findTimeForVitaminD()
//returns the time needed in the sun to get daily vitamin d...or false if 
//if you cant get vit d

  function findTimeForVitamin(skin,uvIndex){
    // console.log(skin,uvIndex)
    if(skin === 1 && uvIndex >= 11){
        return timeToVitD = '1-5min'
    }else if(skin === 1 && (uvIndex >=8 && uvIndex <= 10)|| skin === 2 && uvIndex >= 11){
        return timeToVitD = '2-8min'
    }else if(skin === 1 && (uvIndex >=6 && uvIndex <= 7)||skin === 2 && (uvIndex >=8 && uvIndex <= 10)||skin === 3 && uvIndex >=  11){
        return timeToVitD = '5-10min'
    }else if(skin === 1 && (uvIndex >=3 && uvIndex <= 5)||skin === 2 && (uvIndex >=6 && uvIndex <= 7)||skin === 3 && (uvIndex >=8 && uvIndex <= 10)||skin === 4 && uvIndex >= 11){
        return timeToVitD = '10-15min'
    }else if(skin === 2 && (uvIndex >=3 && uvIndex <= 5)||skin === 3 && (uvIndex >=6 && uvIndex <= 7)||skin === 4 && (uvIndex >=8 && uvIndex <= 10)||skin >= 5 && uvIndex >= 11){
        return timeToVitD = '15-20min'
    }else if(skin === 3 && (uvIndex >=3 && uvIndex <= 5)||skin === 4 && (uvIndex >=6 && uvIndex <= 7)||skin >= 5 && (uvIndex >=8 && uvIndex <= 10)){
        return timeToVitD = '20-30min'
    }else if(skin === 4 && (uvIndex >=3 && uvIndex <= 5)||skin >= 5 && (uvIndex >=6 && uvIndex <= 7)){
        return timeToVitD = '30-40min'
    }else if(skin >= 5 && (uvIndex >=3 && uvIndex <= 5)){
        return timeToVitD = "40-60min"
    }else{
        return timeToVitD = false
    } 
}

//magic ball answers based on true/false values of timeToVitD()
function magicBall(timeToVitD){
    timeToVitD = allData.timeToVitD;
    // console.log(timeToVitD)
    const negativeResponses = ["Don't count on it.", "My reply is no.", 
    "My sources say no.", "Very doubtful.", "Hell no."];
    const postiveResponses = ["It is certain.", "You may rely on it.", 
    "As I see it, yes.", "Outlook good."];
    if (timeToVitD !== false){
        let length = postiveResponses.length;
        let magicNumber = Math.floor(Math.random() * length);
        ballAnswer = postiveResponses[magicNumber];
        return ballAnswer
      }else{
        let length = negativeResponses.length;
        let magicNumber = Math.floor(Math.random() * length);
        ballAnswer = negativeResponses[magicNumber];
        return ballAnswer
    }
  }