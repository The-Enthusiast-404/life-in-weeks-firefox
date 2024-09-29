// background.js
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "updateTabs") {
    browser.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        browser.tabs.sendMessage(tab.id, { action: "updateWeeks" });
      });
    });
  }
});

browser.tabs.onCreated.addListener((tab) => {
  if (tab.url === "about:newtab") {
    browser.tabs.update(tab.id, {
      url: browser.runtime.getURL("new-tab.html"),
    });
  }
});
