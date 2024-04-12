<input type="submit" id="start" value="start">
<input type="submit" id="stop" value="stop">

let start = document.querySelector('StartSession');
let stop = document.querySelector('EndSession');
let timerID;

start.addEventListener('click', function() {
    // Send a message to the content script to start the session
    timerID = setInterval(function() {
        let date = new Date;
        console.log(date.getMinutes() + ' ' + date.getSeconds());
    }, 1000);                              
});
  
stop.addEventListener('click', function() {
    // Send a message to the content script to end the session
    clearInterval(timerID);
});
  
document.getElementById('tabInfo').addEventListener('click', function() {
    // Send a message to the content script to get the URL
    chrome.tabs.create({ url: 'tabInfo.html' });
});
