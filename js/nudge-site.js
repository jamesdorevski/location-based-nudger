let originalUrl;

chrome.runtime.onMessage.addListener(function(request) {
    console.log('url recieved: ' + request);

    originalUrl = request;
    // console.log(originalUrl);
});

document.getElementById("acknowledgeButton").addEventListener("click", function() {
    console.log("in button: " + originalUrl);
    window.location.replace(originalUrl);
});