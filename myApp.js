/**********************************************
* 3. FCC Mongo & Mongoose Challenges
* ==================================
***********************************************/

/** # MONGOOSE SETUP #
/*  ================== */

/** 1) Install & Set up mongoose */

var mongoose = require('mongoose');
var mongoDB = require('mongodb');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);
//mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});


/** # SCHEMAS and MODELS #
/*  ====================== */

/** 2) Create a 'Person' Model */


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const Schema = mongoose.Schema;

var personSchema = new Schema ({
  name : { type: String, required: true },
  age : Number,
  favoriteFoods :[String]
});

var Person =mongoose.model("Person",personSchema);



/** # [C]RUD part I - CREATE #
/*  ========================== */

/** 3) Create and Save a Person */

var createAndSavePerson = function(done) {
  
  var Khaled = new Person({
    name: "Khaled",
    age: 24,
    favoriteFoods: ["Pizza", "Steak"]
  });
    
  Khaled.save(function(err, data){
      if(err) {
        return done(err);
      }
   return done(null, data);
  });
};

/** 4) Create many People with `Model.create()` */


var arrayOfPeople=[
  {name: "hussein",age: 24 ,favoriteFoods:["pizza"]},
  {name: "hossam",age: 24, favoriteFoods:["beef"]},
  {name: "saber",age: 23, favoriteFoods:["steak"]}
];

var createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

/** # C[R]UD part II - READ #
/*  ========================= */

/** 5) Use `Model.find()` */

var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function(err, personFound){
    if (err) return console.log(err);
    done(null, personFound);
  });  
};


/** 6) Use `Model.findOne()` */

var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food},function(err,specificfood){
      if (err) return console.log(err);
      done(null, specificfood);
  });
};

/** 7) Use `Model.findById()` */

var findPersonById = function(personId, done) {
  Person.findById(personId,function(err, done){
    if (err) return console.log(err);
    done(null, done);
  });
};


/** # CR[U]D part III - UPDATE # 
/*  ============================ */

/** 8) Classic Update : Find, Edit then Save */

var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';
   Person.findById(personId, function(err, data){
    data.favoriteFoods.push(foodToAdd);
    data.save(function(err, data){
      if (err) return console.log(err); 
      done(null, data); 
      });  
   });
};

/** 9) New Update : Use `findOneAndUpdate()` */


var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate({name: personName},{$set: { age: ageToSet}}, {new: true}, function(err,data){
    if (err) return console.log(err); 
    done(null, data); 
  });
};


/** # CRU[D] part IV - DELETE #
/*  =========================== */

/** 10) Delete one Person */

var removeById = function(personId, done) {
  Person.findByIdAndRemove(personId, function(err,data){
    if (err) return console.log(err);
    done(null, data);
  });
};


/** 11) Delete many People */

var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.remove({name: nameToRemove},function(err,data){
    if (err) return console.log(err);
     done(null, data);
  });
};

/** # C[R]UD part V -  More about Queries # 
/*  ======================================= */

/** 12) Chain Query helpers */

// If you don't pass the `callback` as the last argument to `Model.find()`
// (or to the other similar search methods introduced before), the query is
// not executed, and can even be stored in a variable for later use.
// This kind of object enables you to build up a query using chaining syntax.
// The actual db search is executed when you finally chain
// the method `.exec()`, passing your callback to it.
// There are many query helpers, here we'll use the most 'famous' ones.

// Find people who like "burrito". Sort them alphabetically by name,
// Limit the results to two documents, and hide their age.
// Chain `.find()`, `.sort()`, `.limit()`, `.select()`, and then `.exec()`,
// passing the `done(err, data)` callback to it.

var queryChain = function(done) {
  var foodToSearch = "burrito";
  
  Person.find({favoriteFoods: foodToSearch}).
  sort({name: 1}).
  limit(2).select({age: 0}).
  exec(function(err,data){
    if(err) return console.log(err);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

/** # Further Readings... #
/*  ======================= */
// If you are eager to learn and want to go deeper, You may look at :
// * Indexes ( very important for query efficiency ),
// * Pre/Post hooks,
// * Validation,
// * Schema Virtuals and  Model, Static, and Instance methods,
// * and much more in the [mongoose docs](http://mongoosejs.com/docs/)


//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
