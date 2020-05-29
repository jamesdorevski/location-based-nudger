let getIpButton = document.getElementById("getIP").onclick = function() {
   
    $.getJSON('https://api.ipify.org?format=json', function(data) {
   
        document.getElementById('showIP').innerHTML = 'Your IP address is: ' + data.ip;
        compareIpAddress(data.ip);
    });
};

let compareIpAddress = (publicIP) => {

    // returns a promise that you need to retrieve the result of (the db)
    let dbPromise = initaliseDb();
    
    dbPromise.then(db => {
        
        let atCampus = determineIfAtCampus(db, publicIP);
        displayIfAtCampus(atCampus);
    });
};

let initaliseDb = () => {
    
    config = {
        locateFile: (file) => `../lib/sqljs-wasm/${file}`
    };

    let dbPromise = initSqlJs(config).then(function(SQL) {

        let db = new SQL.Database();
        
        createTable(db);
        populateTable(db);

        return db;
    }); 

    return dbPromise;
};

let determineIfAtCampus = (db, publicIP) => {

    let result = db.prepare("SELECT COUNT(ip) AS count FROM ipAddresses WHERE ip LIKE '%"+ publicIP +"%' ORDER BY ip ASC;");
    result.step();

    return result.getAsObject().count;
};

let displayIfAtCampus = (atCampus) => {

    let displayCampusDiv = document.getElementById("atCampusDiv");

    if (atCampus >= 1) {
        displayCampusDiv.innerHTML = "You're at the UOW campus.";
    } else {
        displayCampusDiv.innerHTML = "You're not at the UOW campus.";
    }
};