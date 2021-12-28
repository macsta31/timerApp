let getSaves = () => {
    const ul = document.getElementById('savedTimers');
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

    while(i--){
        values.push(localStorage.getItem(keys[i]));
    }
    const list = document.getElementById('savedTimers');
    if(values.length !== 0){
        
        list.innerHTML='';
        console.log(values);
        values.forEach((value) => {
            var realSave = JSON.parse(value)
            console.log(realSave);
            var li = document.createElement("li");
            li.setAttribute('class', 'savedTimer')
            li.appendChild(document.createTextNode(realSave.name));
            
            list.appendChild(li);
        })
    }
    else{
        list.innerHTML='<li id="placeholder">Try saving a timer</li>';
    }
    
}
getSaves();


let setHours = (hours) =>{
    if(hours == 0){
        hours = "00";
    }
    else if(hours < 10){
        hours = "0"+hours;
    }
    document.getElementById('timer-hours').innerHTML = `<h3>${hours}:</h3>`

}


let setMinutes = (minutes) =>{
    if(minutes == 0){
        minutes = "00";
    }
    else if(minutes < 10){
        minutes = "0"+minutes;
    }
    document.getElementById('timer-minutes').innerHTML = `<h3>${minutes}:</h3>`

}
let setSeconds = (seconds) =>{
    if(seconds == 0){
        seconds = "00";
    }
    else if(seconds < 10){

        seconds = "0"+seconds;
    }
    document.getElementById('timer-seconds').innerHTML = `<h3>${seconds}</h3>`

}



let assignDigits = () =>{
    let secondsOverflow = 0;
    let minutesOverflow = 0;

    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    seconds = Math.floor(document.getElementById('seconds').value);
    while(seconds >= 60){
        seconds -= 60;
        secondsOverflow += 1;
    }
    minutes += secondsOverflow;
    minutes += Math.floor(document.getElementById('minutes').value);
    while(minutes >= 60){
        minutes -= 60;
        minutesOverflow += 1;
    }
    hours += minutesOverflow;
    hours += Math.floor(document.getElementById('hours').value);
    
    
    

    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
}

let secondDown = () => {
    var secondValue = parseInt(document.getElementById('timer-seconds').textContent);
    var minuteValue = parseInt(document.getElementById('timer-minutes').textContent);
    var hourValue = parseInt(document.getElementById('timer-hours').textContent);

    
    if(secondValue > 0 ||minuteValue > 0 || hourValue > 0){
        if(secondValue == 0){
            secondValue = 59;
            setSeconds(secondValue);
        }
        if(secondValue == 1 && minuteValue > 0){

            secondValue = 59
            setSeconds(secondValue);
        }
        else if(secondValue == 1 && hourValue > 0){
            secondValue = 59
            setSeconds(secondValue);
        }
        else{
            secondValue = secondValue-1;
            setSeconds(secondValue);
        }
        
    }
    return;

}

let minuteDown = () =>{
    var minuteValue = parseInt(document.getElementById('timer-minutes').textContent);
    var hourValue = parseInt(document.getElementById('timer-hours').textContent);
    if(minuteValue > 0 || hourValue > 0){

        if(minuteValue == 0 && hourValue > 0){
            minuteValue = 59
            setMinutes(minuteValue);
        }
        else{
            minuteValue = minuteValue-1;
            setMinutes(minuteValue);
        }
        
    }
    return;
}
let hourDown = () => {
    var hourValue = parseInt(document.getElementById('timer-hours').textContent);
    if(hourValue > 0){
        hourValue = hourValue-1;
        setHours(hourValue);
    }
    return;
}
let minuteStart = () => {
    minuteDown();
    window.setInterval(minuteDown, 60000);
}
let hourStart = () =>{
    
    hourDown();
    window.setInterval(hourDown, 3600000);
}

let startTimer = (e) => {
    resetTimer();
    assignDigits();
    
    let secondValue = seconds.value;
    let minuteValue = minutes.value;
    window.setInterval(secondDown, 1000);
    minuteTimeout = secondValue*1000;
    window.setTimeout(minuteStart, minuteTimeout);
    hourTimeout = (minuteValue*60000)+(secondValue*1000);
    console.log(hourTimeout);
    window.setTimeout(hourStart, hourTimeout); 
    
}
let resetTimer = (e) => {
    
    var killId = setTimeout(function() {
        for (var i = killId; i > 0; i--) clearInterval(i)
      }, 0);

    setSeconds(0);
    setMinutes(0);
    setHours(0);
}
let saveTimer = (e) => {
    e.preventDefault();
    console.log(document.getElementById('timer-name').value);
    const timer = {
        name: document.getElementById('timer-name').value,
        hours: document.getElementById('hours').value,
        minutes: document.getElementById('minutes').value,
        seconds: document.getElementById('seconds').value,
    }
    const timerJSON = JSON.stringify(timer);
    localStorage.setItem(document.getElementById('timer-name').value, timerJSON);
    getSaves();
    document.getElementById('timer-name').value = '';

}

let savedClick = (e) => {

    var newTimerJSON = localStorage.getItem(e.path[0].textContent);
    var newTimer = JSON.parse(newTimerJSON);
    
    document.getElementById('seconds').value = newTimer.seconds;
    document.getElementById('minutes').value = newTimer.minutes;
    document.getElementById('hours').value = newTimer.hours;
    
}

let clearSaves = () => {
    console.log("clearing");
    localStorage.clear();
    getSaves();

}
document.getElementById('clear-saves').addEventListener('click', clearSaves);
document.getElementById('savedTimers').addEventListener('click', savedClick);
window.addEventListener('storage', getSaves);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('timer-start').addEventListener('click', startTimer);
const submitForm = document.getElementById('saveTimer');
submitForm.addEventListener('submit', saveTimer);



