const express = require('express');
const app = express();



const port = process.env.PORT || 8085;

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`Database is listening and node Runing on port ${port}.`)});