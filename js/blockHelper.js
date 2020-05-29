let getPublicIpAddress = () => {

    let publicIP;

    $.ajax({ 
        url: 'https://api.ipify.org?format=json', 
        dataType: 'json', 
        async: false, 
        success: function(data){ 
            
            publicIP = data;
        } 
    });
    
    return publicIP.ip;
};

let determineIfAtCampus = (db, publicIP) => {

    let result = db.prepare("SELECT COUNT(ip) AS count FROM ipAddresses WHERE ip LIKE '%"+ publicIP +"%' ORDER BY ip ASC;");
    result.step();

    return result.getAsObject().count;
};
