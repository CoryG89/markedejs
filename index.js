var fs = require('fs');
var ejs = require('ejs');
var marked = require('marked');

module.exports = new (function () {
    var self = this;
    this.marked = marked;
    this.ejs = ejs;

    /** Set default markdown options */
    marked.setOptions({
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        smartLists: true
    });

    this.setMarkdownOptions = function (options) {
        marked.setOptions(options);
    };

    this.render = function (string, options, callback) {
        try {
            var html = marked(string);
            html = html.replace(/&lt;/g, '<');
            html = html.replace(/&gt;/g, '>');
            html = html.replace(/&quot;/g, '"');
            html = ejs.render(html, options);
            callback(null, html);
        } catch (error) {
            console.log('MarkedParser.parseFile:  ' + error);
            callback(error);
        }
    };

    this.renderFile = function (path, options, callback) {
        fs.readFile(path, 'utf8', function (error, string) {
            if (error) return callback(error);
            else self.render(string, options, callback);
        });
    };

    this.__express = this.renderFile;
})();
