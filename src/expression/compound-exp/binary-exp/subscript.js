/**
 * 下标表达式
 */

define( function ( require, exports, modules ) {

    var kity = require( "kity" );

    return kity.createClass( 'SubscriptExpression', {

        base: require( "expression/compound-exp/script" ),

        constructor: function ( operand, subscript ) {

            this.callBase( operand, null, subscript );

        }
    } );

} );
