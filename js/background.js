chrome.runtime.onInstalled.addListener(function() {

    initaliseDb();
    let dbPromise = getDb();

    // check if at uni AND on fb
    dbPromise.then(db => {
        // is at uni 

        //debug
        console.log("Is at uni: " + determineIfAtCampus(db, getPublicIpAddress()));

        if (determineIfAtCampus(db, getPublicIpAddress()) == 1) {
            redirectSite();
        }
    });
});

let redirectSite = () => {

    let facebookUrl = "*://*.facebook.com/*";
    let redditUrl = "*://*.reddit.com/*";

    chrome.webRequest.onBeforeRequest.addListener(
        redirect,
        {urls: [facebookUrl, redditUrl] },
        ["blocking"]
    );

    function redirect(requestDetails) {
        console.log("Redirecting: " + requestDetails.url);
        // sending url to nudge-site.js so user can choose to continue

        return {
            redirectUrl: "chrome-extension://" + chrome.runtime.id + "/html/nudge-site.html"
        };
    };
};