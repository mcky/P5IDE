var base_tpl =
    "<!doctype html>" +
    "<html>" +
    "<head>" +
    "<meta charset=\"utf-8\">" +
    "<title>Test</title>" +
    "</head>" +
    "<body>" +
    "</body>" +
    "</html>";

var baseCSS =
    'html,body {'+
        'width: 100%;'+
        'height: 100%;'+
        'margin: 0;'+
        'padding: 0;'+
    '}';

var ace = require('brace')
    , editor = ace.edit('js')
    , session = editor.getSession()
    , jsEditor = document.getElementById('js')
    , outputList = document.getElementById('outputList')
    ,iframe = document.getElementById('render')

require('brace/mode/javascript')
session.setMode('ace/mode/javascript')
session.setUseWorker()
editor.setOption("showPrintMargin", false)


var prepareSource = function() {
    var js = editor.getValue()
        ,p5script = '<script src="./public/js/p5.js"></script>'
        ,src = ''
        ,reg = /(createCanvas\(.*\))/

    js = js.replace(/(createCanvas\(.*\))/g, 'createCanvas('+iframe.offsetWidth+','+iframe.offsetWidth+')');

    src = base_tpl.replace('</body></body>');

    css = '<style>' + baseCSS + '</style>';
    src = src.replace('</head>', css + '</head>');

    js = '<script>' + js + '</script>';
    src = src.replace('</body>', p5script + js + '</body>');

    return src;
};

var renderIframe = function() {
    var source = prepareSource()
        ,iframeDoc = iframe.contentDocument;

    iframeDoc.open();
    iframeDoc.write(source);
    iframeDoc.close();
}

editor.on("change", renderIframe)
renderIframe()
