console.log('this will be a graph visualization lib.');


var levelup = require('levelup')
var Promise = require('bluebird');

// 1) Create our database, supply location and options.
//    This will create or open the underlying LevelDB store.
var db = levelup('./mydb', {
  valueEncoding:{
                    encode : function (val) { return JSON.stringify(val); }
                  , decode : function (val) { return JSON.parse(val); }
                  , buffer : true // encode returns a buffer and decode accepts a buffer 
                }
})

var data = {
  a : 10,
  b : {
    test : 'levelup object'
  },
  c : [1,2,3,4, "5678"]
}


function dbget (key) {
  return new Promise(function(resolve, reject) {
    db.get(key, function(err, value) {
      if (err) {
        console.log('Ooops!', err) // likely the key was not found
        return reject(err);
      }

      console.log('In promise', value);
      resolve(value);
    })
  })
}
console.log("start ");

dbget('name3')
.then(function(result) {
  console.log(result)
  return "end";
})
.then(function(a) {
  console.log(a);
})
.catch(function(err) {
  console.log('err : ', err);
})

console.log("start ");

var generator_ = function* () {
  console.log('before yield');

  var x = yield new Promise(function(resolve, reject) {
    db.get('name', function(err, value) {
      if (err) {
        console.log('Ooops!', err) // likely the key was not found
        return reject(err);
      }

      console.log('In promise', value);
      resolve(value);
    })
  })

  console.log(x);

  console.log('after yield')
}

var test = generator_();

test.next();
test.next();

// 2) put a key & value
db.put('name', data, function (err) {
  if (err) return console.log('Ooops!', err) // some kind of I/O error

  // 3) fetch by key
  db.get('name', function (err, value) {
    if (err) {
     console.log('Ooops!', err) // likely the key was not found
     console.log('My message');
     return;
  }

    // ta da!
    console.log('name1=' + value.b.test);
  })
})