const firebase = require('firebase');
const config = require('./config.json');

firebase.initializeApp({
    databaseURL: config['firebase-database-url'],
    serviceAccount: config['firebase-secret']
});

const db = firebase.database();

module.exports = (target) => {
    return db.ref(target);
}
