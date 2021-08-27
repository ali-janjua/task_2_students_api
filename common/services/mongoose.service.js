const mongoose = require('mongoose');
const config = require('config')
const count = 0;

const options = {
    autoIndex: false, // Don't build indexes
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