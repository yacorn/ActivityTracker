'use strict';

function start() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!
    });
    window.alert(url)
}


document.getElementById("GetUrl").addEventListener("click", start)