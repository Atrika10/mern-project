const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebookdatabase"


// In newer versions of Mongoose, the connect() method no longer accepts a callback function. Instead, it returns a Promise.
// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("connected to mongo successfully")
//     })
// }

async function connectToMongo() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
}
  

module.exports = connectToMongo;