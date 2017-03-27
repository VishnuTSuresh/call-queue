module.exports=function(){
    var queue=[];
    var interval_id;
    function process_queue(){
        if(interval_id===undefined){
            interval_id=setInterval(function(){
                if(queue[0] !== undefined && queue[0].ready === true) {
                    var c = queue.shift();
                    c.callback.apply(c.self,c.param);
                }else{
                    interval_id = undefined;
                    clearInterval(interval_id);
                }
            },1);
        }
    }
    return {
        get_queued_function:function(callback){
            var entry={
                callback:callback,
                ready:false
            };
            queue.push(entry);
            var self=this;
            return function(){
                entry.ready=true;
                entry.param=Array.prototype.slice.call(arguments);
                entry.self=this;
                process_queue();
            }
        }
    };
};