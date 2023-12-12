import * as services from '../sevices'

export const dangKi = async (req, res) => {
    try {
        const fileData = req.file;
        const avatar = fileData?.path;
        const { name, email, password, gioiTinh, sdt, diaChi, namSinh, role_id, } = req.body
        if (!name || !email || !password) return res.status(400).json({
            err: 1,
            mess: "Điền đầy đủ thông tin"
        })
        const response = await services.dangKi({ name, email, password, gioiTinh, sdt, diaChi, namSinh, role_id, avatar })

        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Loi sever"
        })
    }
}

export const dangNhap = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({
            err: 1,
            mess: "Chua nhap email hoac mat khau"
        })
        const response = await services.dangNhap(req.body)

        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Loi sever"
        })
    }
}


export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        await services.forgotPassword(email);
        res.status(200).json({
            err: 1,
            message: 'Bạn hãy vào email để xác thực cấp lại mật khẩu !!!!'
        });
    } catch (error) {
        res.status(200).json({
            err: -1,
            message: 'Tài khoản không tồn tại!!!'
        });
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        await services.resetPassword(token, newPassword);
        res.status(200).json({ message: 'Mật khẩu đã được đặt lại.' });
    } catch (error) {
        res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
};
export const renderResetPasswordPage = (req, res) => {
    
    res.sendFile(__dirname + '/reset-password.html');
};



export const getCurent = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await services.getCurents(userId);

       
        if (result.err === 0) {
            res.status(200).json({ message: result.mess, user: result.user });
        } else {
            res.status(404).json({ message: result.mess, user: null });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', user: null });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const fileData = req.file;
       
        const image = fileData?.path;
        const userId = req.params.userId;
        const { name, newEmail, newPassword, gioiTinh, sdt, diaChi, namSinh } = req.body;
        const result = await services.updateUser({ userId, name, newEmail, newPassword, namSinh, gioiTinh, sdt, diaChi, image });

       
        if (result.err === 0) {
            res.status(200).json({ message: result.mess });
        } else {
            res.status(400).json({ message: result.mess });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        
        const result = await services.getAllUser();

       
        if (result.err === 0) {
            res.status(200).json({ message: result.mess, users: result.users });
        } else {
            res.status(500).json({ message: result.mess, users: null });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', users: null });
    }
};

export const getAllBenhViens = async (req, res) => {
    try {
        
        const result = await services.getAllBenhVien();

       
        if (result.err === 0) {
            res.status(200).json({ message: result.mess, count: result.count, users: result.users });
        } else {
            res.status(500).json({ message: result.mess, users: null });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', users: null });
    }
};

export const getAllBacSiByChuyenKhoa = async (req, res) => {
    try {
        const{id_chuyenKhoa} =req.params;
        const result = await services.getBacSiByChuyenKhoa({id_chuyenKhoa});

        if (result.err === 0) {
            res.status(200).json({ message: result.mess, count: result.count, users: result.users });
        } else {
            res.status(500).json({ message: result.mess, users: null });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', users: null });
    }
};


export const themMoiChuyenKhoa = async (req, res) => {
    try {
        const { id_benhVien } = req.params;
        const { name, description ,price} = req.body
        if (!name) return res.status(400).json({
            err: 1,
            mess: "Điền đầy đủ thông tin"
        })
        const response = await services.themChuyenKhoa({ name, description, id_benhVien,price })

        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Loi sever"
        })
    }
}


export const themMoiBacSi = async (req, res) => {
    try {
        const { id_chuyenKhoa } = req.params;
        const fileData = req.file;
        const avatar = fileData?.path;
        const { name, email, password, gioiTinh, sdt, diaChi, namSinh, role_id, description } = req.body
        if (!name) return res.status(400).json({
            err: 1,
            mess: "Điền đầy đủ thông tin"
        })
        const response = await services.themBacSi({ name, email, password, gioiTinh, sdt, diaChi, namSinh, role_id, description, id_chuyenKhoa, avatar })

        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Loi sever"
        })
    }
}



export const getChuyenKhoas = async (req, res) => {
    try {
        // Lấy userId từ request params hoặc request query
        const { id_benhVien } = req.params;
        // Gọi hàm lấy thông tin người dùng từ service
        const result = await services.getChuyenKhoa(id_benhVien);

       
        if (result.err === 0) {
            res.status(200).json({ message: result.mess, count: result.count, chuyenkhoa: result.chuyenkhoa });
        } else {
            res.status(404).json({ message: result.mess, count: result.count, chuyenkhoa: result.chuyenkhoa });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', user: null });
    }
};


// Tạo lịch khám
export const createSchedule = async (req, res) => {
    try {
        const { doctorId, patientId, timeSlot, startTime, endTime, price, activateDay, appointmentDate, specialtyId } = req.body;
        const response = await services.themLichKham(req.body)
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình tạo lịch khám.' });
    }
};

// Hủy lịch khám
export const cancelSchedule = async (req, res) => {
    try {
        const { id_lichkham } = req.params;
        const response = await services.huyLichKham({ id_lichkham })
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình hủy lịch khám.' });
    }
};
// Đặt lịch khám
export const booking = async (req, res) => {
    try {
        const { id_lichkham } = req.params;
        const { id_benhNhan } = req.body;
        const response = await services.datLich({ id_lichkham,id_benhNhan })
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình đặt lịch khám.' });
    }
};
// Xác nhận lịch khám
export const completeSchedule = async (req, res) => {
    try {
        const { id_lichkham } = req.params;
        const response = await services.xacNhanLichKham({ id_lichkham })
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình xác nhận lịch khám.' });
    }
};


// Lấy dữ liệu lịch khám
export const getSchedule = async (req, res) => {
    try {
        const { id_doctor } = req.params;
        const { activateDay } = req.body;
        const response = await services.getLichKham({ activateDay, id_doctor })
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình lấy lịch khám.' });
    }
};
export const getSchedulebyID = async (req, res) => {
    // try {
        const { getSchedulebyID } = req.params;
        const response = await services.getLichKhamById({getSchedulebyID })
        return res.status(200).json(response)
    // } catch (error) {
    //     res.status(500).json({ error: 'Lỗi trong quá trình lấy lịch khám.' });
    // }
};
// Lấy dữ liệu lịch khám đã được đặt
export const getScheduleByBooked = async (req, res) => {
    try {
        const { id_doctor } = req.params;
        const { activateDay } = req.body;
        const response = await services.getLichKhambyBooked({ activateDay, id_doctor })
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình lấy lịch khám.' });
    }
}
// Xóa lịch khám
export const deleteLichKham = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const response = await services.xoaLichKhamById({ scheduleId })
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình xóa lịch khám.' });
    }
};

export const deleteUsers = async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await services.deleteUser({ userId })
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình xóa lịch khám.' });
    }
};
export const deleteChuyenKhoaS = async (req, res) => {
    try {
        const { id_chuyenKhoa } = req.params;
        const response = await services.deleteChuyenKhoa({ id_chuyenKhoa })
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình xóa lịch khám.' });
    }
};

export const createHistories = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const { hospitalId, doctorId, patientId, timeSlot, appointmentDate, specialtyId ,diagnosis ,medication} = req.body;
        const response = await services.themLichSuKham({hospitalId, doctorId, patientId, timeSlot, appointmentDate, specialtyId ,diagnosis ,medication,scheduleId})
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình tạo lịch khám.' });
    }
};



export const getScheduleHistorybyID = async (req, res) => {
    // try {
        const { getLichSuKhamById } = req.params;
        console.log(getLichSuKhamById)
        const {ngay,tenBenhNhan} = req.body;
        const response = await services.getLichSuKhamById({getLichSuKhamById,ngay ,tenBenhNhan})
        return res.status(200).json(response)
    // } catch (error) {
    //     res.status(500).json({ error: 'Lỗi trong quá trình lấy lịch khám.' });
    // }
};

export const getScheduleHistory = async (req, res) => {
    // try {
        const { getLichSuKhamById } = req.params;
        const response = await services.getLichSuKhamById({getLichSuKhamById,ngay ,tenBenhNhan})
        return res.status(200).json(response)
    // } catch (error) {
    //     res.status(500).json({ error: 'Lỗi trong quá trình lấy lịch khám.' });
    // }
};

export const getLichKhamDaDat = async (req, res) => {
    try {
        const { id_benhnhan } = req.params;
        const response = await services.getLichDatKhambyIdBenhNhan({ id_benhnhan })
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình lấy lịch khám.' });
    }
}
export const getLichKhamHoanThanh = async (req, res) => {
    try {
        const { id_benhnhan } = req.params;
        const response = await services.getLichDaKhambyIdBenhNhan({ id_benhnhan })
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình lấy lịch khám.' });
    }
}
export const getLichKhamHuy = async (req, res) => {
    try {
        const { id_benhnhan } = req.params;
        const response = await services.getLichDaHuybyIdBenhNhan({ id_benhnhan })
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình lấy lịch khám.' });
    }
}
