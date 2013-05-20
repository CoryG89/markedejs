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

    /** Helper method to debug html output of marked engine */
    var debug = function (html) {
        var sep = '----------------------------------------------------------';
        console.log('\n' + sep);
        console.log('markedejs: HTML OUT (markedejs.DEBUG = false to silence)');
        console.log(sep);
        console.log(html);
        console.log(sep + '\n');
    };

    /** Helper method to replace custom <nop></nop> tags for escaping the
        marked engine */
    var replaceNops = function (html) {
        return html
            .replace(/<nop>/g, '')
            .replace(/<\/nop>/g, '');
    };

    /** Unescapes the following symbols, initially these are escaped by the
        marked engine */
    var unescape = function (html) {
        return html
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, '&');
    };

    /** Public wrapper method for setting marked engine options. */
    this.setMarkdownOptions = function (options) {
        marked.setOptions(options);
    };

    /** Renders a string of markdown using EJS templating */
    this.render = function (string, options, callback) {
        try {
            var html = marked(string);
            html = replaceNops(html);
            html = unescape(html);
            if (self.DEBUG) debug(html);
            html = ejs.render(html, options);
            callback(null, html);
        } catch (error) {
            console.log('markedejs.render:  ' + error);
            callback(error, null);
        }
    };

    /** Renders a markdown file using EJS templating */
    this.renderFile = function (path, options, callback) {
        fs.readFile(path, 'utf8', function (error, string) {
            if (error) return callback(error, null);
            else self.render(string, options, callback);
        });
    };

    /** Export for the Express web framework */
    this.__express = this.renderFile;
})();