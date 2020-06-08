let isAtUni;
let redirectedUrl;
let onNudgeSite = 0;
let facebookUrl = '*://*.facebook.com/*';
let redditUrl = '*://*.reddit.com/*';

// init sqllite db
chrome.runtime.onInstalled.addListener( () => {
    
    initaliseDb();
	let dbPromise = getDb();

	// determine if at uni
	dbPromise.then((db) => {
		isAtUni = determineIfAtCampus(db, getPublicIpAddress());
	});
});

chrome.webRequest.onBeforeRequest.addListener(redirectUrl, { urls: [ facebookUrl, redditUrl ] }, [ 'blocking' ]);

function redirectUrl(requestDetails) {
    
    console.log('is at uni: ' + isAtUni);
	console.log('is on nudge site: ' + onNudgeSite);

	if (onNudgeSite == 0) {
		if (isAtUni == 1) {
			console.log('Redirecting: ' + requestDetails.url);
			redirectedUrl = requestDetails.url;

			// flag so user can continue to site once confirmed
			onNudgeSite = 1;

			return {
				redirectUrl: 'chrome-extension://' + chrome.runtime.id + '/html/nudge-site.html'
			};
		}
	}
}

chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
	if (request.nudgeLoaded === 1) {
		console.log('nudge site loaded');
		sendResponse({ url: redirectedUrl });
	}
});

chrome.runtime.onMessage.addListener( (request) => {
	if (request.offNudgeSite == 1) {
		console.log('confirmed user has left nudged site');
		onNudgeSite = 0;
	}
});
