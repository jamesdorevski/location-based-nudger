let originalUrl;

document.getElementById("backButton").addEventListener("click", () => {
    window.history.back();
});

document.getElementById("acknowledgeButton").addEventListener("click", () => {
    window.location.replace(originalUrl);
});

// recieve the original url once nudge-site has completed loaded 
window.addEventListener('load', () => {
    console.log("page has completed loaded");

    chrome.runtime.sendMessage({nudgeLoaded: 1}, (response) => {
        console.log("response recieved:" + response.url);
        originalUrl = response.url;
    });

    // unhide acknowledge button 
    document.getElementById("acknowledgeButton").style.display = "block";
});

// notify background that user went back 
window.addEventListener('unload', () => {
    chrome.runtime.sendMessage({offNudgeSite: 1});
});
