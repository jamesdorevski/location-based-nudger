let originalUrl;

document.getElementById("acknowledgeButton").addEventListener("click", function() {
    window.location.replace(originalUrl);
});

// recieve the original url once nudge-site has completed loaded 
window.addEventListener('load', function() {
    this.console.log("page has completed loaded");

    chrome.runtime.sendMessage({nudgeLoaded: 1}, function(response) {
        console.log("response recieved:" + response.url);
        originalUrl = response.url;
    });
});

// notify background that user went back 
window.addEventListener('unload', function(event) {
    chrome.runtime.sendMessage({offNudgeSite: 1});
});
