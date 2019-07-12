var Issue = require('htmllint/lib/issue'),
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

module.exports.messages = {
    'CE01': {
        format: 'test',
        code: 'CE01'
    }
}; 

module.exports.lint = function (element, opts) {
    var format = opts[this.name],
        attr = element.attribs;

    if(!attr.src || !attr.src.value || format === false) {
        return [];
    }

    // Link must be absolute iff specified format is absolute
    var isAbsolute = attr.src.value.search('://') !== -1;

    return isAbsolute ? [] : {
        code: 'CE01',
        msg: 'an absolute URL is required for each `src` attribute.',
        line: element.openLineCol[0],
        column: element.openLineCol[1]
    };
};