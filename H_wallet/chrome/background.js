// background.js

// let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");

  if (request.action === "FINISH")
      sendResponse({farewell: "goodbye"});
});