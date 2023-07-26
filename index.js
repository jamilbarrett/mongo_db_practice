const { MongoClient, ObjectId } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

client.connect().then(async () => { 
  console.log('Client Connected');

  const db = client.db('rutgers_db');

  const studentsCollection = db.collection('students');

//   await studentsCollection.insertOne({
//     name: 'JD', 
//     course_type: 'FSF-full-time', 
//     projects: [{name: 'Cool app', type: 'database-tester'}]
// });

const students = await studentsCollection
.find()
// .limit(3)
.sort({name: 1})
.toArray()


// const jd = await studentsCollection.findOne({
//     _id: new ObjectId('64c001eb46aeb3f7218cc013')
// })

console.log(students)
})

