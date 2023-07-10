const express = require('express')
const router = express.Router()
const db = require('../models');

router.use(express.urlencoded({extended: false}))
router.use(express.json())

router.post('/performance_logs', async (req, res) => {
    try{
        const { event_category, event_type, event_value, page_url } = req.body;
        const log = await db.performance_logs.create({ 
            event_category, 
            event_type, 
            event_value, 
            page_url 
        });
        res.json(log);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;