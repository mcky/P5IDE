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

var jsEditor = document.getElementById('js')
    ,renderBtn = document.getElementById('renderBtn')
    ,iframe = document.getElementById('render')


var prepareSource = function() {
    var js = jsEditor.value
        ,p5script = '<script src="./js/p5.js"></script>'
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

renderBtn.addEventListener('click', renderIframe, false);

renderIframe()
