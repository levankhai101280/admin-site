// controllers/trips_controller.js
const Trip = require('../models/trips'); // Mô hình trip từ thư mục models

// Hiển thị tất cả chuyến tàu
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.render('trip', { trips: trips });
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi lấy dữ liệu chuyến tàu');
  }
};

// Hiển thị form thêm chuyến tàu
exports.addTripForm = (req, res) => {
  res.render('addTrip');
};

// Thêm chuyến tàu mới
exports.addTrip = async (req, res) => {
  const { name, date, destination } = req.body;
  try {
    const newTrip = new Trip({ name, date, destination });
    await newTrip.save();
    res.redirect('/trips'); // Quay lại trang danh sách chuyến tàu
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi thêm chuyến tàu');
  }
};

// Hiển thị form sửa chuyến tàu
exports.editTripForm = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    res.render('editTrip', { trip: trip });
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi lấy chuyến tàu để sửa');
  }
};

// Cập nhật chuyến tàu
exports.updateTrip = async (req, res) => {
  const { name, date, destination } = req.body;
  try {
    await Trip.findByIdAndUpdate(req.params.id, { name, date, destination });
    res.redirect('/trips');
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi cập nhật chuyến tàu');
  }
};

// Xóa chuyến tàu
exports.deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.redirect('/trips');
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi xóa chuyến tàu');
  }
};
