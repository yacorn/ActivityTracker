let timerID;
document.getElementById('StartSession').addEventListener('click', function() {
    // Send a message to the content script to start the session
    timerID = setInterval(function() {
        console.log('!')
    }, 1000);                              
});
  
document.getElementById('EndSession').addEventListener('click', function() {
    // Send a message to the content script to end the session
    clearInterval(timerID);
});
  
document.getElementById('tabInfo').addEventListener('click', function() {
    // Send a message to the content script to get the URL
    chrome.tabs.create({ url: 'tabInfo.html' });
});
