const mongodb = require('mongodb')

const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://localhost:27017'
const databaseName = 'task-manager'


// const id = new ObjectID()
// console.log('guid', id);
// console.log('time', id.getTimestamp());
// console.log('binary', id.id);
// console.log('hex ', id.toHexString());


MongoClient.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (error, client) => {
  if (error) {
    return console.log('Error connecting: \n', error);
  }
  // console.log('Connected! \n', client);

  const db = client.db(databaseName)

//  CRUD operations on DB:
// CREATE
  // db.collection('users').insertOne({
  //   name: 'code cheeser',
  //   age: 4,
  //   size: 'baby',
  //   _id: id
  // }, (error, result) => console.log('RESULT: \n', result))

  // db.collection('users').insertMany([
  //   {
  //     name: 'jan',
  //     age: '30'
  //   },
  //   {
  //     name: 'may',
  //     age: '13'
  //   }
  // ], (err, res) => {
  //   if (err) {
  //     return console.log('ERROR \n', err);
  //   }
  //
  //   console.log('SUCCESS \n', res.ops);
  // })

  // db.collection('Tasks').insertMany(
  //   [
  //     {
  //       title: 'Smoke weed',
  //       description: 'blaze it',
  //       completed: true
  //     },
  //
  //     {
  //       title: 'eat lunch',
  //       description: 'im starving',
  //       completed: false
  //     },
  //
  //     {
  //       title: 'code',
  //       description: 'write a program',
  //       completed: false
  //     },
  //
  //   ], (err, res) => {
  //     if (err) {
  //       return console.log('ERROR \n', err);
  //     }
  //
  //     console.log('SUCCESS \n', res, res.ops);
  //   }
  // )

// READ
  //
  // db.collection('Tasks').findOne(
  //   {
  //     _id: new ObjectID("5eac5940ee6cfa1523c1ed50")
  //   }, (err, user) => {
  //       if (err) {
  //         return console.log('sry error', err)
  //       }
  //
  //       console.log('task is', user);
  // })
  //
  // db.collection('Tasks').find(
  //   {
  //     completed: false
  //   }
  // )
  //   .toArray(
  //     (error, tasks) => {
  //       if (error) {
  //         return console.log('sry error', error)
  //       }
  //
  //       console.log('tasks are ', tasks);
  //     }
  //   )

// UPDATE
  // let fixNamwe = db.collection('users').updateOne({
  //   _id: new ObjectID("5eac533b31787812edcd4621")
  // }, {
  //   $set: {
  //     name: 'Miguel'
  //   }
  // })
  //
  // fixNamwe.then(console.log).catch(err=>console.log('an error occurred:'. err))

  // db.collection('users').updateOne({
  //   _id: new ObjectID("5eac533b31787812edcd4621")
  // }, {
  //   $inc: {
  //     age: 7
  //   }
  // }).then(res=>console.log(res.matchedCount, res.modifiedCount)).catch(console.log)

    // db.collection('Tasks').updateMany(
    //   {
    //     completed: false
    //   },
    //   {
    //     $setOnInsert: {
    //       difficulty: 100
    //     },
    //     $set: {
    //       completed: true,
    //     }
    //   }
    // ).then(res => console.log('COMPLETE! ', res.modifiedCount)).catch(e=>console.log('ERROR: ', e))

    // db.collection('Tasks').updateMany(
    //   {
    //     title: 'code'
    //   },
    //   {
    //     $set: {
    //       difficulty: 100
    //     }
    //   }
    // ).then(res => console.log('COMPLETE! ', res.modifiedCount)).catch(e=>console.log('ERROR: ', e))

// DELETE
  // db.collection('users').deleteMany(
  //   {
  //     age: '30'
  //   }).then(result => {
  //     console.log(result.deletedCount)
  //   }).catch(console.log);

  db.collection('Tasks').createIndex({title: "text"})

  db.collection('Tasks').deleteOne(
    {
      $text: {
        $search: "eat"
      }
    })
    .then(result => {
      console.log(result.deletedCount)
    }).catch(console.log);

})
