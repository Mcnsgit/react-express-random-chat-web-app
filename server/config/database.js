const dotenv = require('dotenv'); 
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// Configure dotenv

dotenv.config( { path: './.env' } );

// Connect to MongoDB
// export async function connectDB() {
//     try {
//         const connection = await mongoose.connect(process.env.MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected');
//         return connection;
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         process.exit(1);
//     }
// };
const connectDB = async () => {
mongoose.connect( connection = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
    return connection;
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
})
);
};
// export default connectDB;

const dataSchema = new mongoose.Schema({
    name: String,
    type: String,
});
const dataModel = mongoose.model('dataModel', dataSchema);
var newID = new mongoose.mongo.ObjectId('234556567123');
const data = {
    _id: newID,
    name: 'John',
    type: 'user',
};
var dataDetails = new dataModel(data);
dataDetails
.save()
.then((res)=> {
    console.log(res);
})
.catch((err) => {
    console.log(err);
});

module.exports = connectDB;