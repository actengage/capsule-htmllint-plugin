var knife = require('htmllint/lib/knife'),
    Issue = require('htmllint/lib/issue'),
    proc = require('htmllint/lib/process_option');

module.exports = {
    name: 'img-src-absolute',
    on: ['tag'],
    filter: ['img'],
    desc: [
        '* `true`: Each `img` tag with a src must have an absolute path.',
        '* `false`: No restriction.'
    ].join('\n'),
    process: proc.bool
};

module.exports.lint = function (element, opts) {
    var format = opts[this.name],
        attr = element.attribs;

    // Link must be absolute iff specified format is absolute
    var isAbsolute =  attr.href.value.search('://') !== -1;

    if(format === false) {
        return [];
    }

    return isAbsolute ? [] : new Issue('CE01', element.openLineCol, {
        format: format
    });
};