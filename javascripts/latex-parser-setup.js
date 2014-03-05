seajs.config( {
    base: "./parser"
} );

define( "start", function ( require, exports, module ) {

    var Parser = require( "parser" ).Parser,
        Assembly = require( "assembly" ),
        assembly = Assembly.use( document.getElementById( "formulaContainer" ) ),
        input = document.getElementById( "latexInput" ),
        errorTip = document.getElementById( "errorTip" ),
        latexParser = null,
        latexStr = "",
        defaultLatexBox = document.getElementById( "defaultLatexBox" );

    require( 'impl/latex/latex' );

    latexParser = Parser.use( "latex" );

    document.getElementById( "parseBtn" ).onclick = function () {

        latexStr = input.value.replace( /^\s+|\s+$/g, "" );

        if ( latexStr ) {
            try {
                assembly.regenerateBy( latexParser.parse( input.value ) );
            } catch ( e ) {
                showError( "对不起，还未支持该表达式的解析" );
            }
        } else {
            showError( "请输入Latex表达式" );
        }

    };

    // 预设表达式的选取
    document.getElementById( "defaultLatexBtn" ).onclick = function () {
        defaultLatexBox.style.display = "block";
        document.documentElement.style.overflowY = "hidden";
    };

    // 预设表达式弹出层的关闭
    document.getElementById( "defaultLatexBoxCloseBtn" ).onclick = closeBox;

    // 预设表达式的选择
    defaultLatexBox.onclick = function ( e ) {

        if ( e.target.nodeName.toLowerCase() === "li" ) {
            input.value = e.target.innerHTML;
            closeBox();
            input.focus();
        }

    };

    input.onmousedown = function () {
        this.style.borderColor = "#b3b3b3";
        errorTip.innerHTML = "";
    };


    function showError ( errMsg ) {

        input.style.borderColor = "red";
        errorTip.innerHTML = errMsg;

    }

    function closeBox () {
        defaultLatexBox.style.display = "none";
        document.documentElement.style.overflowY = "visible";
    }

} );


window.addEventListener( "DOMContentLoaded", function () {

    seajs.use( 'start' );

});