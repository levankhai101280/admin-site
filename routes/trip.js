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

// Route GET trang sửa chuyến tàu
router.get('/edit/:id', async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);  // Lấy chuyến tàu theo ID
        if (!trip) {
            return res.status(404).send('Chuyến tàu không tồn tại');
        }
        res.render('editTrip', { trip: trip });  // Gửi chuyến tàu vào form sửa
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi lấy dữ liệu chuyến tàu');
    }
});

// Route POST cập nhật chuyến tàu
router.post('/edit/:id', async (req, res) => {
    try {
        const { name, from, to, departureTime } = req.body;
        const updatedTrip = await Trip.findByIdAndUpdate(
            req.params.id,
            { name, from, to, departureTime },
            { new: true }  // Trả về bản ghi đã được cập nhật
        );

        if (!updatedTrip) {
            return res.status(404).send('Chuyến tàu không tồn tại');
        }

        res.redirect('/trips');  // Sau khi cập nhật, chuyển hướng về danh sách chuyến tàu
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi cập nhật chuyến tàu');
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

// Route POST xóa chuyến tàu
router.post('/delete/:id', async (req, res) => {
    try {
        await Trip.findByIdAndDelete(req.params.id);  // Xóa chuyến tàu theo ID
        res.redirect('/trips');  // Sau khi xóa, chuyển hướng về danh sách chuyến tàu
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi xóa chuyến tàu');
    }
});

module.exports = router;
