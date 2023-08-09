const wrapper=document.querySelector(".wrapper"),
inputpart=document.querySelector(".inputpart"),
infotxt=inputpart.querySelector(".info-txt"),
inputfield=inputpart.querySelector("input"),
locationbtn=inputpart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector(".wrapper img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputfield.addEventListener("keyup",e => {
    if(e.key == "Enter" && inputfield.value != ""){
       requestApi(inputfield.value);}
});

locationbtn.addEventListener("click" ,()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        alert("your browser does not support geolocation api");
    }
});

function onSuccess(position){
    const {latitude, longitude} = position.coords;
   api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=f9efc0903c96f45e52e6b9a1dc6b8e44`;
  fetchdata();
  
  
}
function onError(error){
    infotxt.innertext=error.message;
    infotxt.classList.add("error");
}
function requestApi(city){
    api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f9efc0903c96f45e52e6b9a1dc6b8e44`;
    fetchdata();
    }

function fetchdata(){
    infotxt.innerText="geting weather details.....";
    infotxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result));
    
}

function weatherDetails(info){
    infotxt.classList.replace("pending","error");
   
    if(info.cod=="404"){
       infotxt.innerText=`${inputfield.value} is not a valid city name`;
    }
  else{

    const city=info.name;
    const country=info.sys.country;
    const {description,id}=info.weather[0];
    const {feels_like,humidity,temp}=info.main;

    if(id == 800){
        wIcon.src = "clear.svg";
    }else if(id >= 200 && id <= 232){
        wIcon.src = "storm.svg";  
    }else if(id >= 600 && id <= 622){
        wIcon.src = "snow.svg";
    }else if(id >= 701 && id <= 781){
        wIcon.src = "haze.svg";
    }else if(id >= 801 && id <= 804){
        wIcon.src = "cloud.svg";
    }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
        wIcon.src = "rain.svg";
    }

    wrapper.querySelector(".temp .numb").innerText=Math.floor(temp);
    wrapper.querySelector(".weather").innerText=description;
    wrapper.querySelector(".location span").innerText=`${city},${country}`;
    wrapper.querySelector(".temp .numb-2").innerText=Math.floor(feels_like);
    wrapper.querySelector(".humidity span").innerText=`${humidity}%`;
       infotxt.classList.remove("pending","error");
       infotxt.innerText = "";
       inputfield.value = "";
       wrapper.classList.add("active");
       console.log(info);
    }
}
arrowBack.addEventListener("click", ()=>{
        wrapper.classList.remove("active");});
