const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "whatsapp",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;