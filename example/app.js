/** Import required Node.JS modules */
var http = require('http');
var path = require('path');

/** Import required NPM modules */
var express = require('express');
var markedejs = require('markedejs');
markedejs.DEBUG = true;
/** Create our express app object */
var app = express();

/** Default express app configuration */
app.configure(function () {

    /** Set port, view directory, and register markedejs with express as the
        view engine for rendering markdown files. */
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.engine('.md', markedejs.__express);

    /** Simple middleware stack for this example */
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

/** Define app-level locals, global variables available to all views */
app.locals({
    site: {
        title: 'markedejs',
        description: 'Render markdown templates with EJS.'
    },
    author: {
        name: 'Cory Gross',
        email: 'CoryG89@gmail.com',
        url: 'http://coryg89.github.io'
    }
});

/** Define route handling */
app.get('/', function (req, res) {
    
    res.render('template.md', {

        /** Define response-level locals, only available to this view */
        header: 'My Awesome Markdown Template',
        supplies: ['mop', 'broom', 'dustpan'],
        footer: 'This is some footer text',
        showFooter: false,
        user: {
            username: 'SomeUser',
            name : 'you',
            stars: 64
        }

    });
});

/** Create our server and start listening */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
