alert("poop");

let test = (dbPromise) => {

    alert("poop");

    dbPromise.then(db => {
        
        alert(db);
    });
};