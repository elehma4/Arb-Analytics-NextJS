const express = require('express')
const router = express.Router()
const db = require('../models');
const axios = require('axios')
require('../auth/passAuth');
// const protocols = require('../test/protocols')

router.use(express.urlencoded({extended: false}))
router.use(express.json())

// router.get('/protocols', async (req, res) => {
//     try{
//         const response = await axios.get('https://api.llama.fi/protocols');
//         const protocols = response.data;

//         const arbProtocols = protocols.filter(protocol => protocol.chains.includes("Arbitrum") && protocol.symbol !== "-"); 

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

//         res.json(arbProtocols);

//     } 
//     catch (error) {
//         console.log(error);
//         res.status(500).json({error: 'Error in fetching data'});
//     }
    
// })

router.get('/protocols', async (req, res) => {
    try {
      const protocols = await db.protocols.findAll();
      res.json(protocols);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error in fetching data' });
    }
  });

module.exports = router;




// res.json(protocols);

// const protocolsArr = protocols.protocols

// protocolsArr.map(protocol => {
//     if(protocol.chains.includes("Arbitrum") && protocol.symbol !== "-"){
//         console.log(`name: ${protocol.name}`);
//         console.log(`id: ${protocol.id}`);
//         console.log(`description: ${protocol.description}`);
//         console.log(`symbol: ${protocol.symbol}`);
//         console.log(`url: ${protocol.url}`);
//         console.log(`logo: ${protocol.logo}`);
//         // console.log(protocol.tvl);
//         console.log('--------------------------');
//     }
// })