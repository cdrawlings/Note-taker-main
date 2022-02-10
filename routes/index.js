const express = require('express');
const router = express.Router();


// Renders the HTML index page.
router.get('/', (req, res) => {res.render("index")})






module.exports=router