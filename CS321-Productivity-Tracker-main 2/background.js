chrome.tabs.onActivated.addListener(async function(activeInfo) {
  const currentTab = await getCurrentTab();
  if (currentTab.name != 'newtab') {
    chrome.storage.local.get("currentTabData", function(result) {
      const previousTabData = result.currentTabData; // Retrieve the current data
      if (previousTabData) {
        // Store the previous data in "previousTabData"
        chrome.storage.local.set({ previousTabData: previousTabData }, function() {
          console.log('Previous Tab Data Saved:', previousTabData);
        });
      }
      chrome.storage.local.set({ currentTabData: currentTab }, function() {
        console.log('Current Tab Changed: ' + currentTab.name + ' Time: ' + currentTab.time);
      });
    });
  }
});

chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  // Check if the URL of the updated tab has changed
  if (changeInfo.url) {
    const updatedTab = await getCurrentTab();
    if (updatedTab.name != 'newtab') {
      chrome.storage.local.get("currentTabData", function(result) {
        const previousTabData = result.currentTabData; // Retrieve the current data
        if (previousTabData) {
          // Store the previous data in "previousTabData"
          chrome.storage.local.set({ previousTabData: previousTabData }, function() {
            console.log('Previous Tab Data Saved:', previousTabData);
          });
        }
        // Update currentTabData with the new data
        chrome.storage.local.set({ currentTabData: updatedTab }, function() {
          console.log('Current Tab Changed: ' + updatedTab.name + ' Time: ' + updatedTab.time);
        });
      });
    }
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.hasOwnProperty("previousTabData")) {

  }
});

async function storeData(site, timeSpent) {
  let weblistResult = await chrome.storage.local.get("websiteList");
  let timelistResult = await chrome.storage.local.get("timeList");

  const weblist = weblistResult.websiteList;
  const timeList = timelistResult.timeList;

  if (!weblist) {
    let arr = Array(10);
    chrome.storage.local.set({"websiteList": arr}, () => {
      console.log("websiteList initiallized size: {" + arr.length() + "}")
    });
    weblist = await chrome.storage.local.get("websiteList");
  }
  if (!timelist) {
    let arr = Array(10);
    arr.fill(0);
    chrome.storage.local.set({"timeList": arr}, () => {
      console.log("timeList initiallized size: {" + arr.length() + "}")
    });
    timelist = await chrome.storage.local.get("timeList");
  }

  if (weblist.includes(site)) {
    let i = weblist.indexof(site)
    timelist[i] = timeSpent + timelist[i] 
  } else {
    for (let j = 0; j < weblist.length(); j++) {
      if (weblist[j] == 'undefined') {
        i = j;
        break;
      }
    }
    weblist[i] = site;
    timelist[i] = timeSpent;
  }
  chrome.storage.local.set({"websiteList": weblist}, () => {
    console.log('websitelist Updated: ' + weblist);
  });
  chrome.storage.local.set({"timeList": timelist}, () => {
    console.log('timelist Updated: ' + timelist);
  });
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  
  // Get the current time
  const currentTime = new Date().toISOString();


  let parsedUrl = new URL(tab.url);
  let hostname = parsedUrl.hostname;
  let nameDomain = hostname.replace(/^www\./, '');

  // Return an object containing tab's name and time
  return {
    name: nameDomain,
    url: tab.url,
    time: currentTime
  };
}

