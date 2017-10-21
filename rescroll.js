"use strict";

let scroll = {
    delay: 20,
    step: 1
};

function getPageHeight() {
    let body = document.body,
        html = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight);
}

function isAtEndOfScroll() {
    return window.scrollY + window.innerHeight + scroll.step >= getPageHeight();
}

function scrollPage() {
    if (isAtEndOfScroll()) {
        window.scrollTo(window.scrollX, 0);
        browser.runtime.sendMessage({isAtEndOfScroll: true});
    } else {
        window.scrollBy(0, scroll.step);
    }
}

function toggleScroll() {
    if (scroll.interval) {
        clearInterval(scroll.interval);
        scroll.interval = null;
    } else {
        scroll.interval = setInterval(scrollPage, scroll.delay);
    }
}

browser.runtime.onMessage.addListener(function (msg) {
    if (msg.toggleScroll) {
        toggleScroll();
    }
});

browser.runtime.sendMessage({isContentScriptLoaded: true});
