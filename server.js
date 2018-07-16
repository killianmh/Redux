//Required modules and middleware
let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');

//Require api routes and auth routes
let apiRoutes = require('./routes/api-routes/api-routes');
let auth = require('./routes/auth-routes/auth-routes');

//Initialize express app
let app = express();

//Use logger and bodyParser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencocded({ 'extended': 'false'}));

//If in production mode, use static build in client folder
if(process.env.NODE_ENV === 'production'){
    console.log('In the static express build');
    app.use(express.static(path.join(__dirname, '/client/build')));
}

//Define routing to api
app.use('/api', apiRoutes);
app.use('/api/auth', auth);

//Catch 404 errors and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
})

//Error handler
app.use(function(err, req, res, next){
    //Set locals and only provide error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //Send error message
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;