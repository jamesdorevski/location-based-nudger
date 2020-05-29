chrome.runtime.onInstalled.addListener(function() {

    initaliseDb();
    let dbPromise = getDb();

    // check if at uni AND on fb
    dbPromise.then(db => {
        // is at uni 

        //debug
        console.log(determineIfAtCampus(db, getPublicIpAddress()));

        if (determineIfAtCampus(db, getPublicIpAddress()) == 1) {
            redirectSite();
        }
    });
});

let redirectSite = () => {

    let facebookUrl = "*://*.facebook.com/*";
    let twitterUrl = "*://*.twitter.com/*";

    chrome.webRequest.onBeforeRequest.addListener(
        redirect,
        {urls: [facebookUrl, twitterUrl] },
        ["blocking"]
    );

    function redirect(requestDetails) {
        console.log("Redirecting: " + requestDetails.url);
        return {
          redirectUrl: "chrome-extension://fdcianmgcblpcphklfimgniikdolhpfm/html/nudge-site.html"
        };
    };
};