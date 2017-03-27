var expect = require('chai').expect;
var get_queue = require("../index.js");
describe('call-queue', function() {
  describe('fetch', function() {
    it('should call callback in the order of queued function creation', function(done) {
        var queue=get_queue();
        var result=[];
        var callback=function(index){
            result.push(index);
        };
        var q1=queue.get_queued_function(callback);
        var q2=queue.get_queued_function(callback);
        var q3=queue.get_queued_function(callback);
        var q4=queue.get_queued_function(callback);
        var q5=queue.get_queued_function(callback);

        q2(2);
        q3(3);
        q1(1);
        q5(5);
        q4(4);
        setTimeout(function(){
            expect(result).to.deep.equal([1,2,3,4,5]);
            done();
        },100);
        
    });
    it('should call callback in the order of queued function creation asynchronously', function(done) {
        var queue=get_queue();
        var result=[];

        var callback=function(index){
            result.push(index);
        };
        var i=1;
        function call_after_timeout(q,t){
            var index=i;
            i++;
            setTimeout(function(){
                q(index);
            },100*t);
        }
        call_after_timeout(queue.get_queued_function(callback),3);
        call_after_timeout(queue.get_queued_function(callback),1);
        call_after_timeout(queue.get_queued_function(callback),2);
        call_after_timeout(queue.get_queued_function(callback),5);
        call_after_timeout(queue.get_queued_function(callback),4);

        
        setTimeout(function(){
            expect(result).to.deep.equal([1,2,3,4,5]);
            done();
        },700);
        
    });
  });
});