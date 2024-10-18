chrome.runtime.onInstalled.addListener(() => {
  console.log('LinkedIn Job Matcher extension installed');
});

chrome.action.onClicked.addListener((tab) => {
  if (tab.url?.startsWith('https://www.linkedin.com/in/')) {
    chrome.tabs.sendMessage(tab.id!, { action: 'scrapeProfile' }, (response) => {
      console.log('Profile data:', response.profile);
    });
  } else {
    console.log('Not a LinkedIn profile page');
  }
});