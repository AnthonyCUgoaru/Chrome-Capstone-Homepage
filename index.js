
const author=document.getElementById('author')
const stockTop=document.getElementById("stock-top")
const stocks=document.getElementById("stock")
const currentTime=document.getElementById("time")
 const currentWeather=document.getElementById("weather")  


fetch ("https:apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=space")
.then(response=>response.json())
.then(data =>
 {
 	
     document.body.style.backgroundImage = `url(${data.urls.full})`
     author.textContent=`Pic from: ${data.user.name}`

})

.catch(error =>
{
   document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjgxMjQ2MDE&ixlib=rb-1.2.1&q=85)` 
          author.textContent=`Pic from: Chen Liu`

})

 
function stockInfo ()
{
fetch("https://cloud.iexapis.com/stable/stock/AMC/quote?token=pk_e285883bef7a4aa8a3fc447a2bea2d13") 
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        
       
        stockTop.innerHTML = `
        <div class="symbol-logo">
            <img class="logo" src="https://www.marketbeat.com/logos/amc-entertainment-holdings-inc-logo.jpg" />
            <span>${data.symbol}</span>
            </div>

            <div class=info>
             <p>🎯: $${data.latestPrice}</p>  
            <p>👆: $${data.high}</p>
            <p>👇: $${data.low}</p>
            </div>
            `


       // console.log(data)
    
       
 
    })
.catch(err => console.error(err))
}
setInterval(stockInfo,1000)



     
    // AMC stock info 

function clock ()
{
let date = new Date().toLocaleTimeString("en-us", {timeStyle: "short"})
  currentTime.textContent=date
}
setInterval(clock,1000)


navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(response => 
         {
            if (!response.ok) 
            {
                 throw Error("Weather data not available")
            }
            return response.json()
         })
        .then(data =>
        { 
          // console.log(data)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            currentWeather.innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}°</p>
                <p class="city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))


})

