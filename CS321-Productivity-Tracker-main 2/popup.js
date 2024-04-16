document.getElementById('StartSession').addEventListener('click', function() {
    // Send a message to the content script to start the session
    // timerID = setInterval(function() {
    //     let date = new Date;
    //     console.log(date.getMinutes() + ' ' + date.getSeconds());s
    // }, 1000);
    console.log("Set state: 1");
    document.documentElement.style.setProperty('--change', 'rgb(0, 255, 26)');
    document.documentElement.style.setProperty('--state', '1');
    resumeTimer();                
});
  
document.getElementById('EndSession').addEventListener('click', function() {
    // Send a message to the content script to end the session
    console.log("Set state: 0");
    document.documentElement.style.setProperty('--change', 'rgb(255, 0, 0)');
    document.documentElement.style.setProperty('--state', '0');
    stopTimer();
});


window.onload = () => {
    console.log("State Loaded");

    const state = () => {
        chrome.storage.local.get('sessionState', (data) => {
            // Handle the retrieved data within this callback function
            if (data.sessionState == 1) {
                document.documentElement.style.setProperty('--change', 'rgb(0, 255, 26)');
                document.documentElement.style.setProperty('--state', '1');
            } else {
                document.documentElement.style.setProperty('--change', 'rgb(255, 0, 0)');
                document.documentElement.style.setProperty('--state', '0');
            }
            console.log("State Loaded: " + data.sessionState);
        });
    }

    // Call the state function to retrieve and set the initial state
    state();

    // Event listener for button click
    document.getElementById('toggleSes').addEventListener('click', () => {
        if (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--state')) === 0) {
            chrome.storage.local.set({sessionState: 1}, () => {
                console.log("Set state: 1");
                document.documentElement.style.setProperty('--change', 'rgb(0, 255, 26)');
                document.documentElement.style.setProperty('--state', '1');
                resumeTimer();
            });
        } else {
            chrome.storage.local.set({sessionState: 0}, () => {
                console.log("Set state: 0");
                document.documentElement.style.setProperty('--change', 'rgb(255, 0, 0)');
                document.documentElement.style.setProperty('--state', '0');
                pauseTimer();
            });
        }
    });
}

// document.getElementById('goBack').addEventListener('click', function() {
//     // Send a message to the content script to get the URL
//     chrome.tabs.create({ url: 'tabInfo.html' });
// });

document.getElementById('tabInfo').addEventListener('click', function() {
    // Send a message to the content script to get the URL
    chrome.tabs.create({ url: 'tabInfo.html' });
});

document.getElementById('dataClear').addEventListener('click', function() {
    chrome.storage.local.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
    chrome.storage.local.clear();
    clearInterval(timer);
    chrome.storage.local.set({timerState: 2});
});


//https://stackoverflow.com/questions/76596910/
//how-to-create-a-timer-in-html-which-starts-from-same-position-each-time-when-web

chrome.storage.local.get('timeLeft', function(data) {
    // If timeLeft is found in storage, set timerLength to its value
    if (data.timeLeft !== undefined) {
        //timerLength = data.timeLeft;
        timerLength = 30 * 60; //uncomment for test
    } else {
        timerLength = 30 * 60;
    }
    
    // Call the timerFn to update the timer display
    if (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--state')) === 1) {
        timerFn();
        let timer = setInterval(timerFn, 1000);
    }
});


const startTime = Date.now();
const timerDiv = document.getElementById("timer");
let timerRunning = true; // Variable to track whether the timer is running

const timerFn = () => {
    if (!timerRunning) return; // If the timer is paused, do nothing
    
    const state = () => {
        chrome.storage.local.get('sessionState', (data) => {
            const currentTime = Date.now();
            let timeLeft = timerLength - Math.floor((currentTime - startTime) / 1000);
            if (timeLeft < 0) timeLeft = 0;
            chrome.storage.local.set({ timeLeft: timeLeft });
            
            let output = [
                Math.floor(timeLeft / 3600), // hours
                Math.floor(timeLeft % 3600 / 60), // minutes
                Math.floor(timeLeft % 3600 % 60) // seconds
            ]
                .map(n => n.toString().padStart(2, "0")) // leading zeroes
                .join(":");
            
            timerDiv.textContent = output;
        });
    }
    state();
};

// Function to pause the timer
const pauseTimer = () => {
    clearInterval(timer); 
    timerRunning = false; // Update the timerRunning variable to indicate the timer is paused
};

// Function to resume the timer
const resumeTimer = () => {
    timer = setInterval(timerFn, 1000); // Start the timer again
    timerRunning = true; // Update the timerRunning variable to indicate the timer is running
};

const stopTimer = () => {
    clearInterval(timer); 
    let output = [
        0,
        0,
        0
    ]
        .map(n => n.toString().padStart(2, "0")) // leading zeroes
        .join(":");
    const timerDiv = document.getElementById("timer");
    timerDiv.textContent = output;
};
