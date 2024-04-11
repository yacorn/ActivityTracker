chrome.tabs.onActivated.addListener(async function(activeInfo) {
  const currentTab = await getCurrentTab();
  if (currentTab.name != 'newtab') {
    chrome.storage.local.set({ currentTabData: currentTab }, function() {
      console.log('Current Tab Changed: ' + currentTab.name + ' Time: ' + currentTab.time);
    });
  }
});

chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  // Check if the URL of the updated tab has changed
  if (changeInfo.url) {
    const updatedTab = await getCurrentTab();
    if (updatedTab.name != 'newtab') {
      chrome.storage.local.set({ currentTabData: updatedTab }, function() {
        console.log('Current Tab Changed: ' + updatedTab.name + ' Time: ' + updatedTab.time);
      });
    }
  }
});

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

