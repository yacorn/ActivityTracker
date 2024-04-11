document.getElementById('StartSession').addEventListener('click', function() {
    // Send a message to the content script to start the session
});
  
document.getElementById('EndSession').addEventListener('click', function() {
    // Send a message to the content script to end the session
});
  
document.getElementById('tabInfo').addEventListener('click', function() {
    // Send a message to the content script to get the URL
    chrome.tabs.create({ url: 'tabInfo.html' });
});
