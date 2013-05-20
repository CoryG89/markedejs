markedejs
=========

A node module for rendering markdown to HTML and applying EJS templating.

## Dependencies

The `markedejs` module depends only on two other modules for its functionality:

  * [**`chjj/marked`**][1] -- A full-featured markdown parser and compiler,
    written in JavaScript.
  * [**`visionmedia/ejs`**][2] -- Embedded JavaScript template engine.

## What is it?

The `markedejs` module is simply a way to combine the two above technologies
in order to be able to use EJS templating for markdown documents. It also makes
this easy to use in the [**Express web framework**][3] for Node.JS (available at
[**`visionmedia/express`**][4]).

## Example

There are two included sample templates:

  - [**`simple.md`**][5] - A very simple template showing basic usage with EJS.
  - [**`template.md`**][6] - A full featured template with EJS includes.

## Build

In order to build the example apps you'll need to take the following steps. This
assumes you already have [**Node.JS**][7] and [**Git**][8] already installed.
If you do not have git installed you may download the
[compressed source from GitHub][9] and skip the first line of the following:

    $ git clone https://github.com/CoryG89/markedejs.git
    $ cd markedejs/example
    $ npm install

This will install the dependencies for the samples. Now in order to run the
basic Node HTTP example [**`basic.js`**][10] simply use the following command:

    $ node basic

Or in order to instead run [**`app.js`**][11], the example example using the
Express framework, then use the following command:

    $ node app

## Usage

The `markedejs` module is made available through NPM and may be installed into
your application like so:

    npm install markedejs

You may access the module by importing it into your `app.js`:

    var markedejs = require('markedejs');

    var users = [
		 { id: 0, name: 'Bobby Jo', email: 'jjb@example.com' },
        { id: 1, name: 'Jason Dirk', email: 'jd@example.com' },
    ];

    markedejs.render(someMarkdownText, users, function (err, html) {
        // Do something with rendered HTML
    });

     markedejs.renderFile('markdown.md', users, function (err, html) {
        // Do something with rendered HTML
    });

If `markdown.md` contained the following:

    ## MyAwesomeSite

    ### Users List
     
    Here is a list of the users on my awesome site:
    
    <ul>
      <% for (var i = 0; i < users.length; i++) { %>
        <li>**User ID:** <%= user[i].id %> -- **Email:** <%= user[i].email %><li>
      <% } %>
    </ul>

Then the HTML rendered in the callback would be the following:

    <h2>MyAwesomeSite</h2>
    <h3>Users List</h3>
    <p>Here is a list of the users on my awesome site:</p>
    <ul>
      <li><strong>User ID:</strong> 0 -- <strong>Email:</strong> jjb@example.com</li>
      <li><strong>User ID:</strong> 1 -- <strong>Email:</strong> jd@example.com</li>
    </ul>
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
being passed to EJS, you may then use [**includes in your templates**][6] in
order to include arbitrary HTML files in your template like so:

#### Example Template

    <nop><% include header.html %></nop>
    
    ## <%= header %>

    Some more markdown content or something.

    <nop><% include footer.html %></nop>

This template would be rendered by the module into the following HTML

    <% include header.html %>
    <h2><%= header %></h2>
    <p>Some more markdown content or something.</p>
    <% include footer.html %>

If you didn't include the `<nop>` tags, there would be `<p>` tags surrounding
your includes in the HTML output. If we assume that `header.html` and 
`footer.html` contain the following:

    <!-- header.html -->
    <html>
      <head>
        <title><%= title %></title>
      </head>
      <body>

    <!-- footer.html -->
       </body>
    </html>

Then the HTML output will be passed to EJS, along with the two referenced
variables `header` and `title` if they are included with the original
markedejs `render` call and we will get the following HTML returned in our
callback.

    <html>
      <head>
         <title>Your passed in title</title>
      </head>
      <body>
        <h2>Your passed in header</h2>
        <p>Some more markdown content or something.</p>
      </body>
    </html>

[1]: https://github.com/chjj/marked
[2]: https://github.com/visionmedia/ejs
[3]: http://expressjs.com
[4]: https://github.com/visionmedia/express
[5]: https://raw.github.com/CoryG89/markedejs/master/example/views/simple.md
[6]: https://raw.github.com/CoryG89/markedejs/master/example/views/template.md
[7]: http://nodejs.org/
[8]: http://git-scm.com/
[9]: https://github.com/CoryG89/markedejs
[10]: example/basic.js
[11]: example/app.js