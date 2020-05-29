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

let createTable = (db) => {
    
    db.run('CREATE TABLE ipAddresses (ip VARCHAR(15));');
};

let populateTable = (db) => {
    
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.65");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.66");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.67");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.68");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.69");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.70");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.71");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.72");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.73");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.74");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.75");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.76");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.77");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.78");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.79");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.80");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.81");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.82");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.83");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.84");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.85");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.86");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.87");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.88");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.89");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.90");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.91");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.92");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.93");');
    db.run('INSERT INTO ipAddresses(ip) VALUES ("203.10.91.94");');
};