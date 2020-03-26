const fetchLocation = async () =>
    await (await fetch('/.netlify/functions/getCoords')).json()

fetchLocation().then(data =>{
    console.log(data)
})