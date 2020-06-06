let redirectedUrl; 

chrome.runtime.onInstalled.addListener(function() {

    initaliseDb();
    let dbPromise = getDb();

    // check if at uni AND on fb
    dbPromise.then(db => {
        // is at uni 

        //debug
        console.log("Is at uni: " + determineIfAtCampus(db, getPublicIpAddress()));

        let foo = 1; // debug

        // checking if user is trying to access from nudge-site
        if (foo == 1) {
            redirectSite();
            sendMessageToNudgeSite();
        }
    });
});



let redirectSite = () => {

    console.log("called");

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
        redirectedUrl = requestDetails.url;

        return {
            redirectUrl: "chrome-extension://" + chrome.runtime.id + "/html/nudge-site.html"
        };
    };
};

let sendMessageToNudgeSite = () => {

    chrome.webRequest.onBeforeRequest.addListener(
        sendUrl,
        {urls: ["chrome-extension://" + chrome.runtime.id + "/html/nudge-site.html"]}
    );

    function sendUrl() {
        chrome.runtime.sendMessage(redirectedUrl);
        console.log("sent");
    };
};