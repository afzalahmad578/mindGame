const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config')
const cookieParser = require('cookie-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const index = require('./routes/index.routes');
const mongoConnection = require('./helper/mongoConnection');


// make dependencies of app is global
require('./util/dependency');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Swagger 
var swaggerDefinition = {
  info: {
    title: 'Mind Game',
    version: '1.0.0',
    description: 'Documentation of Mind Game App',
  },
  host: config.host,
  basePath: '/api/v1',
};
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*/*.js'],
};

var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// initialize swagger-jsdoc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, authtoken, access_token,Accept, authorization");
  res.header("Access-Control-Allow-Methods", "*");
  console.log('--------------------------------request Details----------------------------------------', req.originalUrl);
  console.log('access_token', req.headers['access_token']);
  console.log('authorization', req.headers['authorization']);
  console.log('user-agent', req.body);
  console.log('req-headers ', req.headers)
  console.log('-----------------------------------------ENDS------------------------------------------');
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
});



app.use(express.static(__dirname + '/'));
app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 *  Routes Base
 */
app.use('/api/v1', index);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.listen(config.config()['port'], function () {
    console.log("server listening on " + config.config()['port']);
})

  

/**
 * comment sawgger
 */
// const swaggerSpec = swaggerJSDoc({
//     swaggerDefinition: {
//         info: {
//             title: 'RCC ADMIN API',
//             version: '1.0.0'
//         }
//     },
//     apis: ['./Routes/admin/adminRoutes/*.js']
// });

// app.get('/swagger.json', function (req, res) {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
// });
// // app.get('/api-docs.json', function (req, res) {
// //     res.setHeader('Content-Type', 'application/json');
// //     res.send(swaggerSpec);
// // });
// var options = {
//     explorer : true
//   };

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,options));  