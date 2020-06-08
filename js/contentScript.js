// tells background that user has left nudged site to reset nudge 
window.addEventListener('unload', () => {
    chrome.runtime.sendMessage({offNudgeSite: 1});
});

