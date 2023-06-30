const express = require('express');
const app = express()

const port = 3001;

app.use(require('./routes/authentication'))

// ENTERS PROTOCOLS INTO DB:
app.use(require('./routes/protocols'))

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})