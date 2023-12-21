import * as controller from '../controllers'
import express from 'express'
import uploadCloud  from '../mid/cloudinary-upload';
const router = express.Router();

router.post('/' ,uploadCloud.single('image'),controller.dangKi)
router.post('/login' ,controller.dangNhap)
// Định tuyến cho yêu cầu quên mật khẩu
router.post('/forgot-password', controller.forgotPassword);

// Định tuyến cho yêu cầu đặt lại mật khẩu
router.get('/reset-password/:token', controller.renderResetPasswordPage);
router.post('/reset-password/:token', controller.resetPassword);
router.get('/getCurent/:userId', controller.getCurent);
router.get('/getAllUser', controller.getAllUsers);
router.get('/getAllBenhVien', controller.getAllBenhViens);
router.get('/getAllBacSi', controller.getAllBacsis);
router.get('/getAllKhachHang', controller.getAllKhachHangs);
router.get('/getBacSiByChuyenKhoa/:id_chuyenKhoa', controller.getAllBacSiByChuyenKhoa);
router.post('/updateUser/:userId', uploadCloud.single('image'),controller.updateUserController);
router.post('/themchuyenkhoa/:id_benhVien', controller.themMoiChuyenKhoa);
router.post('/thembacsi/:id_chuyenKhoa',uploadCloud.single("image"), controller.themMoiBacSi);
router.get('/chuyenkhoa/:id_benhVien', controller.getChuyenKhoas);
router.post('/themlichkham', controller.createSchedule);
router.post('/huylichkham/:id_lichkham', controller.cancelSchedule);
router.post('/xacnhanlichkham/:id_lichkham', controller.completeSchedule);
router.post('/datlich/:id_lichkham', controller.booking);
router.post('/lichkham/:id_doctor', controller.getSchedule);
router.get('/lichkhamdadat/:getSchedulebyID', controller.getSchedulebyID);
router.post('/lichDatKham/:id_doctor', controller.getScheduleByBooked);
router.delete('/xoalich/:scheduleId', controller.deleteLichKham);
router.delete('/xoaChuyenKhoa/:id_chuyenKhoa', controller.deleteChuyenKhoaS);
router.delete('/xoaUser/:userId', controller.deleteUsers);



router.post('/themsulichkham/:scheduleId', controller.createHistories);
router.post('/laysulichkham/:getLichSuKhamById', controller.getScheduleHistorybyID);
router.get('/laysulichkham/:getLichSuKhamById', controller.getScheduleHistorybyID);

router.get('/lich-kham-da-dat-by-id-benhnhan/:id_benhnhan', controller.getLichKhamDaDat);
router.get('/lich-kham-hoan-thanh-by-id-benhnhan/:id_benhnhan', controller.getLichKhamHoanThanh);
router.get('/lich-kham-da-huy-by-id-benhnhan/:id_benhnhan', controller.getLichKhamHuy);
router.get('/lich-kham-hoan-thanh/:id_benhnhan', controller.LichKhamHoanThanhbyBenhNhan);
router.get('/lich-kham-hoan-thanh-bv/:id_benhnhan', controller.benhAn);
router.get('/lich-kham-hoan-thanh-by-lichkham/:id_benhnhan', controller.benhAnTheoLich);
router.get('/lich-kham-da-huy/:id_benhnhan', controller.lichKhamHuy);
module.exports = router

