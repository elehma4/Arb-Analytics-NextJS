const express = require('express');
const axios = require('axios');
const db = require('./models')

const app = express();

const port = 3001;

app.use(require('./routes/authentication'))

// ENTERS PROTOCOLS INTO DB:
app.use(require('./routes/protocols'))

// Fetch & update TVL/MCAP for each protocol
async function fetchAndUpdate() {
    // Fetch all protocols from your database
    const protocols = await db.protocols.findAll();

    for (let protocol of protocols) {
        try {
            // Fetch the latest data from Defi Llama
            const response = await axios.get(`https://api.llama.fi/protocol/${protocol.name.toLowerCase().replace(/\s+/g, '-')}`);
            const data = response.data;

            // Compute total TVL from all chains
            let totalTVL = Object.values(data.currentChainTvls).reduce((a, b) => a + b, 0);

            // Update the protocol in the database:
            await db.protocols.update(
                {
                    TVL: totalTVL,
                    MCAP: data.mcap || null,
                },
                {
                    where: {
                        id: protocol.id,
                    },
                }
            );
            console.log(`Updated ${protocol.name} with TVL: ${totalTVL} and MCAP: ${data.mcap}`);
        } catch (error) {
            console.error(`Failed to update ${protocol.name}: ${error.message}`);
        }
    }
}
// Fetch & update immediately when the server start
// fetchAndUpdate(); // <- Uncomment when in Production | Comment in Development

// Then fetch and update every 12 hours
// setInterval(fetchAndUpdate, 24 * 60 * 60 * 1000); // <- Uncomment when in Production | Comment in Development

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})