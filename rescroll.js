"use strict";

let scroll = {
    delay: 50,
    step: 1
};

function isAtEndOfScroll(element) {
    return element.scrollHeight - element.scrollTop === element.clientHeight;
}

function scrollPage() {
    if (isAtEndOfScroll(document.body)) {
        window.scrollTo(window.scrollX, 0);
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
