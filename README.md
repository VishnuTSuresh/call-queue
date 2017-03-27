# call-queue
Allows you to create functions such that, you can force them to be called only in a particular order.
## Installation
npm install call-queue
## Usage
You may look at test file for good usage examples.

```javascript
var queue=new CallQueue();

var q1=queue.get_queued_function(()=>{console.log(1)});
var q2=queue.get_queued_function(()=>{console.log(2)});
var q3=queue.get_queued_function(()=>{console.log(3)});

q2();
//nothing happens as q2 represents 2nd function and first function has not been called yet

q1();
// prints 
// 1
// 2
// because both functions were called, while they were called in order 2 first then 1, it still executes in order 1 followed by 2

q3();
// 3
```

## License
MIT License

Copyright (c) 2017 Vishnu T Suresh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.