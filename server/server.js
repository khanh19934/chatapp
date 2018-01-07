const path = require('path');
const express = require('express');
const app = express();


const publicPath = path.join(__dirname,'../client');

app.use(express.static(publicPath));
const PORT = process.env.NODE_ENV || 8080;

app.listen(PORT,() => {
    console.log('Server is running in port: ' + PORT);
});