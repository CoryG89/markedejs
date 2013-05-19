var fs = require('fs');
var ejs = require('ejs');
var marked = require('marked');

module.exports = new (function () {
    var self = this;
    this.marked = marked;
    this.ejs = ejs;
    this.DEBUG = false

    /** Set default markdown options */
    marked.setOptions({
        gfm: true,
        tables: true,
        smartLists: true,
        breaks: false,
        pedantic: false,
        sanitize: false
    });

    var debug = function (html) {
        var sep = '----------------------------------------------------------';
        console.log('\n' + sep);
        console.log('markedejs: HTML OUT (markedejs.DEBUG = false to silence)');
        console.log(sep);
        console.log(html);
        console.log(sep + '\n');
    };

    var unescape = function (html) {
        return html
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, '&');
    };

    this.setMarkdownOptions = function (options) {
        marked.setOptions(options);
    };

    this.render = function (string, options, callback) {
        try {
            var html = marked(string);
            html = unescape(html);
            if (self.DEBUG) debug(html);
            html = ejs.render(html, options);
            callback(null, html);
        } catch (error) {
            console.log('markedejs.render:  ' + error);
            callback(error, null);
        }
    };

    this.renderFile = function (path, options, callback) {
        fs.readFile(path, 'utf8', function (error, string) {
            if (error) return callback(error, null);
            else self.render(string, options, callback);
        });
    };

    this.__express = this.renderFile;
})();
