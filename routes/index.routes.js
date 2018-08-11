const express = require('express');
const router = express.Router();


/*  Sub Route*/
const student = require('./users/users.routes');
const admin = require('./admin/admin.routes');

router.use('/user', student);

router.use('/admin',admin);


module.exports = router;  
