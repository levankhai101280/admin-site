const mongoose = require('mongoose');

// Định nghĩa schema cho chuyến tàu
const tripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    }
});

// Tạo model cho chuyến tàu
const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
