(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global['raf-plus'] = global['raf-plus'] || {})));
}(this, (function (exports) { 'use strict';

var callbackMap = new Map();

var requestAnimationFrame = function requestAnimationFrame(callback) {
    if (!callbackMap.has(callback)) {
        var requestId = window.requestAnimationFrame(function (ts) {
            callbackMap.delete(callback);
            callback(ts);
        });
        callbackMap.set(callback, requestId);
    }
};

var cancelAnimationFrame = function cancelAnimationFrame(callback) {
    var requestId = callbackMap.get(callback);
    window.cancelAnimationFrame(requestId);
    callbackMap.delete(callback);
};

exports.requestAnimationFrame = requestAnimationFrame;
exports.cancelAnimationFrame = cancelAnimationFrame;

Object.defineProperty(exports, '__esModule', { value: true });

})));
