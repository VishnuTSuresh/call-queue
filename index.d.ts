declare class CallQueue {
    private queue;
    private interval_id;
    constructor();
    private process_queue();
    get_queued_function(callback: Function): Function;
}
export default CallQueue;
