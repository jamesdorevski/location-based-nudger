// tells background that user has left nudged site to reset nudge 
window.addEventListener('unload', function(event) {
    chrome.runtime.sendMessage({offNudgeSite: 1});
});

