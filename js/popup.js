window.onload = function() {


    let publicIP = getPublicIpAddress();

    this.document.getElementById("showIP").innerHTML = "Your public IP address is: " + publicIP;
    
    compareIpAddress(publicIP);
};

let compareIpAddress = (publicIP) => {

    initaliseDb();

    let dbPromise = getDb();

    dbPromise.then(db => {

        let atCampus = determineIfAtCampus(db, publicIP);
        displayIfAtCampus(atCampus);
    });
};

let displayIfAtCampus = (atCampus) => {

    let displayCampusDiv = document.getElementById("atCampusDiv");

    if (atCampus >= 1) {
        displayCampusDiv.innerHTML = "You're at the UOW campus.";
    } else {
        displayCampusDiv.innerHTML = "You're not at the UOW campus.";
    }
};