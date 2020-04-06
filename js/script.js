
const dataGoesHere = document.getElementById('sunData');
const dataDisplay =document.getElementById('peekABoo');
const searchForm = document.getElementById('searchForm')
const submitButton = document.getElementById('submitButton');
const skinChoice = document.getElementById('skin');
const searchInput = document.getElementById('searchInput');
const summarySpan = document.getElementById('summary');
const ballSpan = document.getElementById('ballSpan');
const timeSpan = document.getElementById('timeSpan');
const toggleTime = document.getElementById('toggleTime')

dataDisplay.style.display ='none';


searchForm.addEventListener("submit", e => {
    e.preventDefault();
    getAllInfo();
    // const searchValue = searchInput.value;
    // allData.skin = parseInt(skinChoice.options[skinChoice.selectedIndex].value)
    // fetchLocation(searchValue)
})

async function getAllInfo(){
    //clean here and give feedback to user
    const searchValue = searchInput.value;
    allData.skin = parseInt(skinChoice.options[skinChoice.selectedIndex].value)
    await fetchLocation(searchValue)
    allData.timeToVitD = findTimeForVitamin(allData.skin,allData.uvIndex)
    allData.ballAnswer = magicBall(allData.skin, allData.timeToVitD) 
    changeDisplay()
};
// const fetchLocation = async ()=>
//   await(await fetch('/.netlify/functions/test')).json();

 async function fetchLocation(searchValue){
    // console.log(searchValue)
     let data = await(await fetch(`/.netlify/functions/test?place=${searchValue}`)).json()
      .then(data =>{
            allData.uvIndex = data.currently.uvIndex;
            allData.temp = Math.round(data.currently.temperature);
            allData.summary = data.currently.summary;      
})
};

let allData = {
    skin : getAllInfo.skin,  
    uvIndex : fetchLocation.uvIndex,
    temp: fetchLocation.temp,
    summary :fetchLocation.summary,
    timeToVitD: getAllInfo.timeToVitD,
    ballAnswer: getAllInfo.ballAnswer
}


function changeDisplay(){
    dataDisplay.style.display ='block';
    tempSpan.textContent = allData.temp;
    uvSpan.textContent = allData.uvIndex;
    summarySpan.textContent = allData.summary;
    ballSpan.textContent = allData.ballAnswer;
    if(allData.timeToVitD !== false){
        timeSpan.textContent = allData.timeToVitD;
        toggleTime.style.display ='block';
    }else 
        toggleTime.style.display ='none';
        // console.log(allData)
    }


// fetchLocation()
//     .then(data =>{
//         console.log(data)
//         let uvIndex = data.currently.uvIndex;
//         let temp = Math.round(data.currently.temperature);
//         let summary = data.currently.summary;
//         console.log(uvIndex,temp,summary)
// })





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