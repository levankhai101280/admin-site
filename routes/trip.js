const express = require('express');
const router = express.Router();
const Trip = require('../models/trips');  // Đảm bảo đường dẫn đúng

// Route GET danh sách chuyến tàu
router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find();  // Lấy tất cả chuyến tàu từ MongoDB
        res.render('trip', { trips: trips });  // Gửi dữ liệu chuyến tàu vào view
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi lấy dữ liệu chuyến tàu');
    }
});

// Route POST thêm chuyến tàu
router.post('/add', async (req, res) => {
    try {
        const { name, from, to, departureTime } = req.body;

        // Tạo mới một chuyến tàu
        const newTrip = new Trip({
            name,
            from,
            to,
            departureTime
        });

        // Lưu chuyến tàu vào MongoDB
        await newTrip.save();

        // Sau khi thêm thành công, chuyển hướng về trang danh sách chuyến tàu
        res.redirect('/trips');
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi thêm chuyến tàu');
    }
});

module.exports = router;
