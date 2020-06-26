fetch('http://localhost:3000/weather?address=Hyderabad').then((response) => {
    response.json().then((data)=>{
        console.log(data);
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')


weatherForm.addEventListener('submit' ,(e) =>{ 
    e.preventDefault()
    fetch('/weather?address='+search.value).then((response) => {
        response.json().then((data)=>{
            message.textContent = "It is "+data.forecastData.weather[0].description+" in "+search.value
        })
    })
})