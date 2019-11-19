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
  Person.findById(personId,function(err, ID){
    if (err) return console.log(err);
    done(null, ID);
  });
};


/** # CR[U]D part III - UPDATE # 
/*  ============================ */

/** 8) Classic Update : Find, Edit then Save */

// In the good old days this was what you needed to do if you wanted to edit
// a document and be able to use it somehow e.g. sending it back in a server
// response. Mongoose has a dedicated updating method : `Model.update()`,
// which is directly binded to the low-level mongo driver.
// It can bulk edit many documents matching certain criteria, but it doesn't
// pass the edited document to its callback, only a 'status' message.
// Furthermore it makes validation difficult, because it just
// direcly calls the mongodb driver.

// Find a person by Id ( use any of the above methods ) with the parameter
// `personId` as search key. Add "hamburger" to the list of her `favoriteFoods`
// (you can use Array.push()). Then - **inside the find callback** - `.save()`
// the updated `Person`.

// [*] Hint: This may be tricky if in your `Schema` you declared
// `favoriteFoods` as an `Array` without specifying the type (i.e. `[String]`).
// In that case `favoriteFoods` defaults to `Mixed` type, and you have to
// manually mark it as edited using `document.markModified('edited-field')`
// (http://mongoosejs.com/docs/schematypes.html - #Mixed )

var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';
  
  done(null/*, data*/);
};

/** 9) New Update : Use `findOneAndUpdate()` */

// Recent versions of `mongoose` have methods to simplify documents updating.
// Some more advanced features (i.e. pre/post hooks, validation) beahve
// differently with this approach, so the 'Classic' method is still useful in
// many situations. `findByIdAndUpdate()` can be used when searching by Id.
//
// Find a person by `name` and set her age to `20`. Use the function parameter
// `personName` as search key.
//
// Hint: We want you to return the **updated** document. In order to do that
// you need to pass the options document `{ new: true }` as the 3rd argument
// to `findOneAndUpdate()`. By default the method
// passes the unmodified object to its callback.

var findAndUpdate = function(personName, done) {
  var ageToSet = 20;

  done(null/*, data*/);
};

/** # CRU[D] part IV - DELETE #
/*  =========================== */

/** 10) Delete one Person */

// Delete one person by her `_id`. You should use one of the methods
// `findByIdAndRemove()` or `findOneAndRemove()`. They are similar to the
// previous update methods. They pass the removed document to the cb.
// As usual, use the function argument `personId` as search key.

var removeById = function(personId, done) {
  
  done(null/*, data*/);
    
};

/** 11) Delete many People */

// `Model.remove()` is useful to delete all the documents matching given criteria.
// Delete all the people whose name is "Mary", using `Model.remove()`.
// Pass to it a query ducument with the "name" field set, and of course a callback.
//
// Note: `Model.remove()` doesn't return the removed document, but a document
// containing the outcome of the operation, and the number of items affected.
// Don't forget to pass it to the `done()` callback, since we use it in tests.

var removeManyPeople = function(done) {
  var nameToRemove = "Mary";

  done(null/*, data*/);
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
  
  done(null/*, data*/);
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
