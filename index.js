require('dotenv').config({path: '.env'});
var express = require('express'),
    session = require('express-session'),
    path = require('path'),
    // config = require('./config/config.js'),
    // constant = require('./config/constant.json'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    objLogger = require('raven'),
    cookieParser = require('cookie-parser'),
    generalHelper = require('./helpers/general'),
    appMiddleware = require('./middlewares/app');
    
app = express();
app.options('*', function (req, res, next) {
    res.status(200).end();
    return false;
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(favicon(path.join(__dirname, 'public', 'images', 'mushroom.jpeg')));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(appMiddleware.initCorsSetting);
app.use('/', require('./api/index'));
app.use('/prediction', require('./api/prediction'));

if (!generalHelper.isEmpty(process.env.LOGGER_CONFIG_SERVER_URL)) {
    objLogger.config(process.env.LOGGER_CONFIG_SERVER_URL, {
        logger: 'api'
    }).install();
    app.locals.logger = objLogger;
    app.use(objLogger.errorHandler());
    app.use(objLogger.requestHandler());
}

app.use(function (err, req, res, next) {
    // set locals, only providing error in dev
    res.locals.message = err.message;
    res.locals.error = err;

    res.status(err.status || 500);
    res.render('error');
});

var port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log('Mushroom app listening on port ' + port + '!');
});

module.exports = app;