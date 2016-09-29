console.log('this will be a graph visualization lib.');


var levelup = require('levelup')

// 1) Create our database, supply location and options.
//    This will create or open the underlying LevelDB store.
var db = levelup('./mydb', {
  valueEncoding:{
                    encode : function (val) { return JSON.stringify(val); }
                  , decode : function (val) { return JSON.parse(val); }
                  , buffer : true // encode returns a buffer and decode accepts a buffer 
                  , type   : "test"  // name of this encoding type. 
                }
})

var data = {
  a : 10,
  b : {
    test : 'levelup 1234'
  },
  c : [1,2,3,4, "5678"]
}

db.get('name', function (err, value) {
  if (err) return console.log('Ooops!', err) // likely the key was not found

  // ta da!
  console.dir(value);
  console.log('name=' + value.b.test);
})

// 2) put a key & value
db.put('name', data, function (err) {
  if (err) return console.log('Ooops!', err) // some kind of I/O error

  // 3) fetch by key
  db.get('name', function (err, value) {
    if (err) return console.log('Ooops!', err) // likely the key was not found

    // ta da!
    console.log('name1=' + value.b.test);
  })
})