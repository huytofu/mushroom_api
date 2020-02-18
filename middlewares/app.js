
let appMiddleWare = {
/**
 * initialize CORS settings
 * @param req
 * @param res
 * @param next
 */
    initCorsSetting: function(req, res, next) {
        if (process.env.NODE_ENV === 'development') {
            res.setHeader('Access-Control-Allow-Origin', '*');
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            // res.setHeader('Access-Control-Allow-Origin', app.locals.config.webappUrl);
        }

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-access-token');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    }
}

module.exports = appMiddleWare;