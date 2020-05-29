chrome.runtime.onInstalled.addListener(function() {

    let pattern = "*://*.facebook.com/*";

    // let nudgeSite = () => {
    //     if (determineIfAtCampus(getDb, ))
    // };
    
    chrome.webRequest.onBeforeRequest.addListener(
        redirect,
        {urls: [pattern] },
        ["blocking"]
    );

    function redirect(requestDetails) {
        console.log("Redirecting: " + requestDetails.url);
        return {
          redirectUrl: "chrome-extension://fdcianmgcblpcphklfimgniikdolhpfm/html/nudge-site.html"
        };
    };
});
