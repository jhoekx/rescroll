"use strict";

let scroll = {
    step: 1,
    frameDelay: 20,
    startDelay: 0,
    endDelay: 0,
};

document.getElementById("rescroll-options").addEventListener("change", function (e) {
    let id = e.target.getAttribute("id");
    if (id === "step") {
        let pixels = parseFloat(e.target.value);
        browser.storage.local.set({ step: pixels });
    }
    if (id === "framedelay") {
        let milliseconds = parseFloat(e.target.value);
        browser.storage.local.set({ frameDelay: milliseconds });
    }
    if (id === "startdelay") {
        let milliseconds = parseFloat(e.target.value);
        browser.storage.local.set({ startDelay: milliseconds });
    }
    if (id === "enddelay") {
        let milliseconds = parseFloat(e.target.value);
        browser.storage.local.set({ endDelay: milliseconds });
    }
}, false);

browser.storage.local.get(scroll).then(function (config) {
    if (config.step) {
        document.getElementById("step").value = config.step;
    }
    if (config.frameDelay) {
        document.getElementById("framedelay").value = config.frameDelay;
    }
    if (config.startDelay) {
        document.getElementById("startdelay").value = config.startDelay;
    }
    if (config.endDelay) {
        document.getElementById("enddelay").value = config.startDelay;
    }
});
