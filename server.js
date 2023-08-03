const app = require('./app');
const mongoose = require('mongoose');

const { DB_URI, PORT = 3000 } = process.env;

mongoose
    .connect(DB_URI)
    .then(() => {
        console.log('\x1b[38;5;40m Database connection successful');
        app.listen(PORT, () => {
            console.log('\x1b[38;5;40m Server running. Use our API on port: 3000');
        });
    })
    .catch(error => {
        console.log(`\x1b[38;5;162m ${error.message}`);
        process.exit(1);
    });
