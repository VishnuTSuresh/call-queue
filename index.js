(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var QueueEntry = (function () {
        function QueueEntry(callback, ready, self, param) {
            this.callback = callback;
            this.ready = ready;
            this.self = self;
            this.param = param;
        }
        return QueueEntry;
    }());
    var CallQueue = (function () {
        function CallQueue() {
            this.queue = [];
        }
        CallQueue.prototype.process_queue = function () {
            var _this = this;
            if (this.interval_id === undefined) {
                this.interval_id = setInterval(function () {
                    if (_this.queue[0] !== undefined && _this.queue[0].ready === true) {
                        var c = _this.queue.shift();
                        c.callback.apply(c.self, c.param);
                    }
                    else {
                        _this.interval_id = undefined;
                        clearInterval(_this.interval_id);
                    }
                }, 1);
            }
        };
        CallQueue.prototype.get_queued_function = function (callback) {
            var _this = this;
            var entry = new QueueEntry(callback, false);
            this.queue.push(entry);
            var self = this;
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                entry.ready = true;
                entry.param = Array.prototype.slice.call(args);
                entry.self = _this;
                _this.process_queue();
            };
        };
        return CallQueue;
    }());
    exports["default"] = CallQueue;
});
//# sourceMappingURL=index.js.map