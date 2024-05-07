const { connect } = require('mongoose');

exports.connectDB = () => {
    connect('mongodb://127.0.0.1:27017/myFirstDB')
    console.log('Date Base connected')
}