/**
 * Created by Administrator on 2017/4/26.
 */


define(function(require, exports, module) {
    var jquery = require('jquery');
    exports.sayHello = function() {
        $('#hello').toggle('slow');
    };
});