const express = require('express')
const router = express.Router()
const db = require('../models');
const axios = require('axios')
require('../auth/passAuth');
// const protocols = require('../test/protocols')
const fuzzball = require('fuzzball');

router.use(express.urlencoded({extended: false}))
router.use(express.json())

router.get('/protocols', async (req, res) => {
    try {
      const protocols = await db.protocols.findAll();
      res.json(protocols);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error in fetching data' });
    }
  });
  router.get('/favorites', async (req, res) => {
    try {
      const userID = req.headers['x-user-id'];
      console.log('userID', userID)
      console.log(userID)
      const favorites = await db.favorites.findAll({
        where: {
          userID
        }
      });
  
      // Extract the protocol IDs from the favorites
      const protocolIDs = favorites.map((favorite) => favorite.protocolID);
  
      // Fetch the associated protocols based on the protocol IDs
      const protocols = [];
      for (const protocolID of protocolIDs) {
        const protocol = await db.protocols.findOne({
          where: {
            id: protocolID
          }
        });
        protocols.push(protocol);
      }
  
      res.json(protocols);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error in fetching data' });
    }
  });
  
  // Add favorite
router.post('/favorites', async (req, res) => {
  try {
    const { userID, protocolID } = req.body;

    // Logic to add the favorite to the database
    // ...

    const favorites = await db.favorites.create({
      userID,
      protocolID
    })

    const protocol = await db.protocols.findOne({
      where: {
        id: protocolID
      }
    });

    res.status(201).json(protocol);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error adding favorite' });
  }
});

// Remove favorite
router.delete('/favorites', async (req, res) => {
  try {
    console.log('109')
    const { userID, protocolID } = req.body;
    console.log(userID, protocolID)

    // Logic to remove the favorite from the database
    // ...

    await db.favorites.destroy({
      where: {
        userID,
        protocolID
      }
    });

    res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error removing favorite' });
  }
});
  

module.exports = router;


router.get('/ArbitrumProtocols', async (req, res) => {
    try{
        const response = await axios.get('https://api.llama.fi/protocols');
        const protocols = response.data;

        const arbProtocols = protocols.filter(protocol => protocol.chains.includes("Arbitrum") && protocol.symbol !== "-"); 

//         ENTERS PROTOCOLS INTO DATABASE:
//         for (const protocol of arbProtocols){
//             await db.protocols.create({
//                 name: protocol.name,
//                 llamaID: parseInt(protocol.id),
//                 description: protocol.description,
//                 symbol: protocol.symbol,
//                 url: protocol.url,
//                 logo: protocol.logo
//             });
//         }

        res.json(arbProtocols);

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error in fetching data'});
    }
    
})

function normalize(name) {
  return name.toLowerCase().replace(/\s+/g, '');
}

router.get('/update-protocols', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    const allCoinGeckoProtocols = response.data.map(item => ({id: item.id, name: normalize(item.name)}));

    const dbProtocols = await db.protocols.findAll();
    for (const protocol of dbProtocols) {
      let normalizedName = normalize(protocol.name);
      let bestMatches = fuzzball.extract(normalizedName, allCoinGeckoProtocols.map(item => item.name), { scorer: fuzzball.ratio, limit: 1 });

      let bestMatch = bestMatches[0];
      console.log(`Best match for ${protocol.name} is ${bestMatch ? bestMatch[0] : 'none'} with score ${bestMatch ? bestMatch[1] : 'none'}`);
      if(bestMatch && bestMatch[1] > 90){
        let matchedCoin = allCoinGeckoProtocols.find(item => item.name === bestMatch[0]);
        if(matchedCoin){
          protocol.geckoID = matchedCoin.id;
          console.log(protocol.toJSON());
          await protocol.save();
          console.log(`Updated protocol ${protocol.name}`);
        }
      }
    }

    res.send('Protocols have been updated!')
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error updating protocols');
  }
})
