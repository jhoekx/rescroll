"use strict";

let scroll = {};
let config = {
    frameDelay: 20,
    step: 1,
    startDelay: 0,
    endDelay: 0
};

function getPageHeight() {
    let body = document.body,
        html = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
}

function isAtEndOfScroll() {
    return window.scrollY + window.innerHeight + config.step >= getPageHeight();
}

function scrollPage() {
    if (isAtEndOfScroll()) {
        scroll.timeout = setTimeout(function () {
            window.scrollTo(window.scrollX, 0);
            browser.runtime.sendMessage({ isAtEndOfScroll: true });
        }, config.endDelay);
    } else {
        window.scrollBy(0, config.step);
        scroll.timeout = setTimeout(scrollPage, config.frameDelay);
    }
}

function toggleScroll() {
    if (scroll.timeout) {
        clearTimeout(scroll.timeout);
        scroll.timeout = null;
    } else {
        scroll.timeout = setTimeout(function () {
            scroll.timeout = setTimeout(scrollPage, config.frameDelay);
        }, config.startDelay);
    }
}

browser.runtime.onMessage.addListener(function (msg) {
    if (msg.toggleScroll) {
        toggleScroll();
    }
});

browser.storage.local.get(config).then(function (initialConfig) {
    config = initialConfig;
    browser.runtime.sendMessage({ isContentScriptLoaded: true });
});

browser.storage.local.onChanged.addListener(function (changes) {
    for (let key of Object.keys(changes)) {
        config[key] = changes[key].newValue;
    }
});
