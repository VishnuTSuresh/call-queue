class QueueEntry {
    public constructor(public callback?: Function, public ready?: boolean, public self?: any, public param?: any[]) {

    }
}
class CallQueue {
    private queue: QueueEntry[]
    private interval_id: number
    public constructor() {
        this.queue = [];
    }
    private process_queue() {
        if (this.interval_id === undefined) {
            this.interval_id = setInterval(() => {
                if (this.queue[0] !== undefined && this.queue[0].ready === true) {
                    var c = this.queue.shift();
                    c.callback.apply(c.self, c.param);
                } else {
                    this.interval_id = undefined;
                    clearInterval(this.interval_id);
                }
            }, 1);
        }
    }
    public get_queued_function(callback: Function):Function {
        var entry: QueueEntry = new QueueEntry(callback, false);
        this.queue.push(entry);
        var self = this;
        return (...args:any[])=>{
            entry.ready = true;
            entry.param = Array.prototype.slice.call(args);
            entry.self = this;
            this.process_queue();
        }
    }
}
export default CallQueue;