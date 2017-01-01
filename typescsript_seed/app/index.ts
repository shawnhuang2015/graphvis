import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as Rx from 'rxjs/Rx';
// var Rx = require('rxjs/Rx');

declare var document: {
  querySelector: any;
};

console.log("Start at ", new Date().toString());

var myObservable1 = new Subject();


var myObservable1Shared = myObservable1.asObservable().share();

myObservable1
  .subscribe(value => console.log('Value: ', value));

myObservable1Shared
  .subscribe(value => console.log('myObservable1Shared Value: ', value));

myObservable1.next([1, 2, 3, 4, 5, 6]);

var myObservable2 = Rx.Observable.create((observer: any) => {
  observer.next('foo');
  setTimeout(() => observer.next('bar'), 1000);
});

myObservable2.subscribe((value: string) => console.log(value));


// typing "hello world"
var input = Rx.Observable.fromEvent(document.querySelector('input'), 'keypress');

// Filter out target values less than 3 characters long
input
  // .filter((event: any) => {
  //   event.target.value.length > 2
  // })
  .subscribe((value: any) => console.log(value)); // "hel"

// Delay the events
input.delay(200)
  .subscribe(value => console.log(value)); // "h" -200ms-> "e" -200ms-> "l" ...

// Only var through an event every 200 ms
input.throttleTime(200)
  .subscribe(value => console.log(value)); // "h" -200ms-> "w"

// var through latest event after 200 ms
input.debounceTime(200)
  .subscribe(value => console.log(value)); // "o" -200ms-> "d"

// Stop the stream of events after 3 events
input.take(3)
  .subscribe(value => console.log(value)); // "hel"

// Passes through events until other observable triggers an event
// var stopStream = Rx.Observable.fromEvent(document.querySelector('button'), 'click');
// input.takeUntil(stopStream);
// .subscribe(value => console.log(value)); // "hello" (click)

var button = document.querySelector('button');
var clickStream: Observable<any> = Rx.Observable.fromEvent(button, 'click');

// HERE
// The 4 lines of code that make the multi-click logic
var multiClickStream = clickStream
  .map(function(list: any) { console.log(1, list); return 2; })
  .filter(function(x: any) { console.log(1, x); return x >= 2; });

// // Same as above, but detects single clicks
// var singleClickStream = clickStream
//     .buffer(function() { return clickStream.throttle(250); })
//     .map(function(list) { return list.length; })
//     .filter(function(x) { return x === 1; });

// // Listen to both streams and render the text label accordingly
// singleClickStream.subscribe(function (event) {
//     document.querySelector('h2').textContent = 'click';
// });
multiClickStream.subscribe(function(numclicks) {
  console.log(111, numclicks);
  document.querySelector('h2').textContent = '' + numclicks + 'x click';
});

var source = Rx.Observable
  .range(1, 2)
  .flatMap(function(x) {
    return Rx.Observable.range(x, 2);
  });

var subscription = source.subscribe(
  function(x) {
    console.log('Next: ' + x);
  },
  function(err) {
    console.log('Error: ' + err);
  },
  function() {
    console.log('Compvared');
  });

var source1 = Rx.Observable.interval(1000);

var subscription1 = source1.subscribe(
  function(x) { console.log('Observer 1: onNext: ' + x); },
  function(e) { console.log('Observer 1: onError: ' + e.message); },
  function() { console.log('Observer 1: onCompvared'); });



setTimeout(function() {
  subscription1.unsubscribe();

  var subscription2 = source1.subscribe(
    function(x) { console.log('Observer 2: onNext: ' + x); },
    function(e) { console.log('Observer 2: onError: ' + e.message); },
    function() { console.log('Observer 2: onCompvared'); });

  setTimeout(function() {
    subscription2.unsubscribe();
  }, 2000);
}, 2000);


console.log('Current time: ' + Date.now());

// Creates a sequence
var source2 = Rx.Observable.interval(1000);

// Convert the sequence into a hot sequence
var hot = source2.publish();

// No value is pushed to 1st subscription at this point
var subscription3 = hot.subscribe(
  function(x) { console.log('Observer 3: onNext: %s', x); },
  function(e) { console.log('Observer 3: onError: %s', e); },
  function() { console.log('Observer 3: onCompvared'); });

console.log('Current Time after 1st subscription: ' + Date.now());

// Idle for 3 seconds
setTimeout(function() {

  // Hot is connected to source and starts pushing value to subscribers
  hot.connect();

  console.log('Current Time after connect: ' + Date.now());

  // Idle for another 3 seconds
  setTimeout(function() {

    console.log('Current Time after 2nd subscription: ' + Date.now());

    var subscription4 = hot.subscribe(
      function(x) { console.log('Observer 4: onNext: %s', x); },
      function(e) { console.log('Observer 4: onError: %s', e); },
      function() { console.log('Observer 4: onCompvared'); });

    setTimeout(function() {
      subscription3.unsubscribe();
      subscription4.unsubscribe();
    }, 5000);

  }, 3000);
}, 3000);

/* Using buffer boundaries */
var openings = Rx.Observable.interval(1000);

// Convert the window to an array
var source5 = Rx.Observable.timer(500, 200)
  .buffer(openings)
  .take(5);

var subscription5 = source5.subscribe(
  function(x) {
    console.log('Subscription 5 Next: %s', JSON.stringify(x));
  },
  function(err) {
    console.log('Error: %s', err);
  },
  function() {
    console.log('Compvared');
  });


/* Without share */
var interval = Rx.Observable.interval(1000);

var source = interval
  .take(2)
  .do(function(x) {
    console.log('Side effect');
  });

var published = source.share();

published.subscribe(function(x) {
  console.log('Next: ' + 'SourceA' + x);
},
  function(err) {
    console.log('Error: ' + err);
  },
  function() {
    console.log('Completed');
  });
published.subscribe(function(x) {
  console.log('Next: ' + 'SourceB' + x);
},
  function(err) {
    console.log('Error: ' + err);
  },
  function() {
    console.log('Completed');
  });

var src1 = Rx.Observable.from([1, 2, 3]).map(x => `source 1: ${x}`);
var src2 = Rx.Observable.from([4, 5, 6]).map(x => `source 2: ${x}`);

src1
  .concat(src2)
  .subscribe(
  (value) => console.log(`from Next: ${value}`));

src1
  .merge(src2)
  .subscribe(
  (value) => console.log(`from Next: ${value}`));


var times = [
  { value: 0, time: 100 },
  { value: 1, time: 600 },
  { value: 2, time: 400 },
  { value: 3, time: 700 },
  { value: 4, time: 200 }
];

// Delay each item by time and project value;
var source = Rx.Observable.from(times)
  .flatMap(function(item) {
    return Rx.Observable
      .of(item.value)
      .delay(item.time);
  })
  .debounce(value => Rx.Observable.timer(200));

var subscription = source.subscribe(
  function(x) {
    console.log('delay Next: %s', x);
  },
  function(err) {
    console.log('Error: %s', err);
  },
  function() {
    console.log('Completed');
  });


var array = [
  1000,
  700,
  600,
  200
];

var source = Rx.Observable.from(array)
  .flatMap(function(x) { return Rx.Observable.timer(x); })
  .map(function(x, i) { return i; })
  .debounce(function(x) { return Rx.Observable.timer(200); });
  // .debounce(function(x) { return Rx.Observable.timer(100); });

var subscription = source.subscribe(
  function(x) {
    console.log('debounce Next: %s', x);
  },
  function(err) {
    console.log('Error: %s', err);
  },
  function() {
    console.log('Completed');
  });





