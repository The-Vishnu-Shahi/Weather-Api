
 
let inp = document.getElementById("inp"); 
let temp = document.getElementById("temp"); 
let cityDisplay = document.getElementById("cityDisplay"); 
let img = document.getElementById("img"); 
 

async function callApi(inp) { 
  try { 
    const response = await fetch( 
      `https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=65844cd1d62a701db61c4d3f5178b177 `
    ); 
    const result = await response.json(); 
       if(result.cod==="404") 
        return alert('Please Enter valid city') 
    displayData(result); 
  } catch (e) { 
    console.log(e); 
  } 
} 
 
 
function displayData(data) { 
  console.log(data.main.temp); 
  temp.textContent = Math.round(data.main.temp) - 273 + "°"; 
 
  cityDisplay.textContent = data.name; 
  img.src =  `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png `
} 
 
inp.addEventListener("keydown", (e)=>{ 
    if(e.key==="Enter"){ 
        callApi(inp.value); 
        inp.value =  ""; 
 
    } 
}) 
 
 
 
async function displayCurrentlocationData(latitude, longitude){ 
    try{ 
const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=65844cd1d62a701db61c4d3f5178b177`); 
const result =  await response.json(); 
displayData(result) 
    }catch(e){ 
        console.log(e) 
    } 
} 
 
navigator.geolocation.getCurrentPosition((position)=>{ 
            const {latitude, longitude} =  position.coords; 
            displayCurrentlocationData(latitude, longitude) 
}, (err)=>{ 
    console.log(err) 
})