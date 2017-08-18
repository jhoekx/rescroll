"use strict";

browser.browserAction.onClicked.addListener(function (tab) {
    browser.tabs.sendMessage(tab.id, {toggleScroll: true});
});
