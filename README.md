markedejs
=========

A node moudule for rendering markdown into HTML and applying EJS templating.

## Dependencies

The `markedejs` module depends only on two other modules for its functionality:

  * [**chjj/marked**][1] -- A full-featured markdown parser and compiler,
    written in JavaScript.

  * [**visionmedia/ejs**][2] -- Embedded JavaScript template engine.

## What is it?

The `markedejs` module is simply a way to combine the two above technologies
in order to be able to use EJS templating for markdown documents. It also makes
this easy to use in the [**Express web framework**][3] for Node.JS (available at
[**visionmedia/express**][4]).

## Build

In order to build the examples you'll need to take the following steps, this
assumes you already have Node.JS and Git already installed. If you do not have
git installed you may download the [compressed source from GitHub][5]:

    $ git clone https://github.com/CoryG89/markedejs.git
    $ cd markedejs/example
    $ npm install

This will install the dependencies for the samples. Now in order to run the
[basic Node HTTP example][6] simply run the following command:

    $ node basic

Or in order to run the sample using the Express web framework, instead run the
the following command:

    $ node app

## Usage

The `markedejs` module is made available through NPM and may be installed into
your application like so:

    npm install markedejs

You may access the module by importing it into your `app.js`:

    var markedejs = require('markedejs');

    var users = [
		 { id: 0, name: 'Bobby Jo', email: 'JoJoBinks@mycorona.com' },
        { id: 1, name: 'Jason Dirk', email: 'JJDirk@yoohoo.com' },
    ];

    markedejs.render(someMarkdownText, users, function (err, html) {
        // Do something with rendered HTML
    });

     markedejs.renderFile(someMarkdownText, users, function (err, html) {
        // Do something with rendered HTML
    });

## Express

It is easy to use `markedejs` with Express as a view engine. Simply do the
following in your `app.js`, where `app` is your Express app object.

    var markedejs = require('markedejs');
    app.engine('.md', markedejs.__express);

You can also add the following if you want to markdown to be your default view
engine in Express.

    app.set('view engine', 'md');

This means that you can call `render('template')` instead of
 `render('template.md')`.

## Custom `<nop>` tag

In order to use EJS includes without having them surrounded by `<p>` tags,
surround your includes with a custom `<nop>` tags which are removed before
being passed to EJS, you may then use [**includes in your templates**][7] in
order to include arbitrary HTML files in your template like so:

#### Example Template

    ```
    <nop><% include header.html %></nop>
    
    ## <%= header %>

    Some more markdown content or something.

    <nop><% include footer.html %></nop>
    ```

This template would be rendered by the module into the following HTML

    ```
    <% include header.html %>
    <h2><%= header %></h2>
    <p>Some more markdown content or something.</p>
    <% include footer.html %>
    ```

If you didn't include the `<nop>` tags, there would be `<p>` tags surrounding
your includes in the HTML output. If we assume that `header.html` and 
`footer.html` contain the following:

    ```
    <!-- header.html -->
    <html>
      <head>
        <title><%= title %></title>
      </head>
      <body>

    <!-- footer.html -->
       </body>
    </html>
    ```

Then the HTML output will be passed to EJS, along with the two referenced
variables `header` and `title` if they are included with the original
markedejs `render` call and we will get the following HTML returned in our
callback.

    ```
    <html>
      <head>
         <title>Your passed in title</title>
      </head>
      <body>
        <h2>Your passed in header</h2>
        <p>Some more markdown content or something.</p>
      </body>
    </html>
    ```

[1]: https://github.com/chjj/marked
[2]: https://github.com/visionmedia/ejs
[3]: http://expressjs.com
[4]: https://github.com/visionmedia/express
[5]: https://github.com/CoryG89/markedejs
[6]: example/basic.js
[7]: example/app.js
[8]: example/views/template.md