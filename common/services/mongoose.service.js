const mongoose = require('mongoose');
let config = require('config')
let count = 0;

const options = {
    autoIndex: false, // Don't build indexes
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true
    
};
const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect(config.DBHost, options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log(err)
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

exports.mongoose = mongoose;