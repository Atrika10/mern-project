const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    obj = {
        name : 'Atrika',
        age : 21
    }
    res.json(obj);
});
module.exports = router;