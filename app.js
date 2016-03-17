var
  express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  router = require('./core/router'),
  exphbs  = require('express-handlebars'),
  app = express(),
  webpack = require('webpack'),
  config = require('./webpack.config'),
  compiler = webpack(config),
  DEVELOPMENT = 'dev',
  ENV = process.env.NODE_ENV;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (ENV === DEVELOPMENT) {
  // app.use(logger('dev'));
  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    contentBase: './src',
    stats: {
      colors: true,
      chunks: false
    }
  });

  var hotMiddleware = require('webpack-hot-middleware')(compiler);

  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' });
      cb();
    });
  });

  // handle fallback for HTML5 history API
  // app.use(require('connect-history-api-fallback')());
  // serve webpack bundle output
  app.use(devMiddleware);
  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware);

  app.use(express.static(path.join(__dirname, 'src')));

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
} else {
  app.use(express.static(path.join(__dirname, 'dist')));

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

// Init routes and controllers
router.initRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found ' + req.originalUrl);
  err.status = 404;
  next(err);
});

console.log(
  `
              ▄▄▄▄▄      ▄███▄      ▄▄▄▄
           ▄█████████▄▄█████████▄▄████████▄
          ██████████████████████████████████
           ▀██████████████████████████████▀
            ▄███████████████████████████▄
          ▄███████████████████████████████▄
         ▀█████████████████████████████████▀
           ▀██▀        ▀██████▀       ▀██▀
                  ██     ████    ██
                        ▄████▄
                        ▀████▀
                          ▀▀
                  `
);
if (ENV === DEVELOPMENT) {
  console.log(`
    ███████████████████████████████████████████████████████
    ██  KUZZLE BO IS READY FOR DEVELOPMENT (port 3000)   ██
    ███████████████████████████████████████████████████████`);
} else {
  console.log(`
    ███████████████████████████████████████████████████████
    ██     KUZZLE BO IS READY (port 3000)                ██
    ███████████████████████████████████████████████████████`);
}
module.exports = app;
