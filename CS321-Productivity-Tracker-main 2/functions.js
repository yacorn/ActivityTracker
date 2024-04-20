

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

export default testSubject;