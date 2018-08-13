const express = require('express');
const router = express.Router();


/*  Sub Route*/
const user = require('./users/users.routes');
const admin = require('./admin/admin.routes');

router.use('/user', user);

router.use('/admin',admin);


module.exports = router;  
