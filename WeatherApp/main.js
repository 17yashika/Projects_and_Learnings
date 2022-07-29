const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt")
inputField = inputPart.querySelector("input");
locationBtn = inputPart.querySelector("button");
wIcon = document.querySelector(".weather-part img")
arrowBack = wrapper.querySelector("header i")
let api;

inputField.addEventListener("keyup", e =>{
    // if user press enter and input value is not empty
    if(e.key=="Enter" && inputField.value != ""){
      //  console.log("hello");
      requestApi(inputField.value);
    } 
})

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else{
        alert("Your browser does not support geolocation api.")
    }
});
function onSuccess(position){
    //console.log(position);
    const {latitude, longitude} = position.coords; //getting lat and long of the user device drom coords obj
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=eea61707e2fcf2232a57b6b482e58c4e`;
    fetchData();
}


function onError(error){
   //console.log(error);
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city){
    // console.log(city);
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=eea61707e2fcf2232a57b6b482e58c4e`;
   fetchData();

}
function fetchData(){
    infoTxt.innerHTML = "Getting weather details....";
    infoTxt.classList.add("pending");
    //getting api response and returning it with parsing into js obj 
    // in another 'then' function calling weatherDetails function with passing api result as an argument.        
    fetch(api).then(response => /*console.log(response.json()*/ response.json()).then(result => weatherDetails(result));
}
function  weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.innerHTML = `${inputField.value} isn't a valid city name`;
        infoTxt.classList.replace("pending", "error");
    }
    else{
        //getting required prperties value from the info object
        const city = info.name;
        const country = info.sys.country;
        const{description, id} = info.weather[0];
        const{feels_like, humidity, temp} = info.main;

        //using icon according to the id
        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id<=232){
            wIcon.src = "icons/storm.svg";
        }else if(id >= 600 && id<=622){
            wIcon.src = "icons/snow.svg";
        }
        else if(id >= 800 && id<=804){
            wIcon.src = "icons/cloud.svg";
        }
        else if((id >= 300 && id<=321)|| (id >= 500 && id<=531)){
            wIcon.src = "icons/rain.svg";
        }
        else if(id >= 701 && id<=781){
            wIcon.src = "icons/haze.svg";
        }

        //passing these values to particular html element
        wrapper.querySelector(".temp .numb").innerHTML = Math.floor(temp);
        wrapper.querySelector(".weather").innerHTML = description;
        wrapper.querySelector(".location span").innerHTML = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerHTML = humidity;


        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
    }
     
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
})
