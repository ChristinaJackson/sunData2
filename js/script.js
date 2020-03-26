const fetchLocation = async () =>
    await (await fetch('/.netlify/functions/getCoords')).json()

fetchLocation().then(data =>{
    let locationResponse = data.json()
    console.log(data)
})