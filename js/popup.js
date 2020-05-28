let getIpButton = document.getElementById("getIP").onclick = function() {
   
    $.getJSON('https://api.ipify.org?format=json', function(data) {
   
        document.getElementById('showIP').innerHTML = 'Your IP address is: ' + data.ip;
        compareIpAddress(data.ip);
    });
};

let compareIpAddress = (publicIP) => {

    let atCampus = initaliseDb(publicIP);
    displayIfAtCampus(atCampus); 
};

let initaliseDb = (publicIP) => {
    config = {
        locateFile: (file) => `../lib/sqljs-wasm/${file}`
    };

    initSqlJs(config).then(function(SQL) {

        let db = new SQL.Database();

        createTable(db);
        populateTable(db);
        
        let atCampus = determineIfAtCampus(db, publicIP);
        return atCampus;
    });    
};

let determineIfAtCampus = (db, publicIP) => {

    let result = db.prepare("SELECT COUNT(ip) AS count FROM ipAddresses WHERE ip LIKE '%"+ publicIP +"%' ORDER BY ip ASC;");
    result.step();

    // debug
    console.log(result.getAsObject().count);
    
    return result.getAsObject().count;
};

let displayIfAtCampus = (atCampus) => {

    let displayCampusDiv = document.getElementById("atCampusDiv");

    if (atCampus === 1) {
        displayCampusDiv.innerHTML = "You're at the UOW campus.";
    } else {
        displayCampusDiv.innerHTML = "You're not at the UOW campus.";
    }
};