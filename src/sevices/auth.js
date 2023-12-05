import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import Sequelize from 'sequelize'
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(9))


// Hàm đăng ký
export const dangKi = ({ name, email, password, gioiTinh, sdt, diaChi, namSinh, role_id, avatar }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: {
                name,
                email,
                password: hashPassword(password),
                gioiTinh,
                namSinh,
                sdt,
                diaChi,
                role_id,
                avatar
            }
        })
        const token = response[1] ? jwt.sign({
            id: response[0].id,
            email: response[0].email,
            role_id: response[0].role_id,
        }, process.env.JWT_SECRET,
            {
                expiresIn: '90d'
            })
            : null
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'Đăng kí thành công' : 'Tài khoản đã tồn tại',
            'access_token': token ?  token : token
        })
    }
    catch (e) {
        reject(e)
    }
})

export const getCurents = (userId) => new Promise(async (resolve, reject) => {
    try {
       
        const user = await db.User.findByPk(userId);

        if (!user) {
            resolve({
                err: -1,
                mess: 'Người dùng không tồn tại',
                user: null
            });
            return;
        }

        // Trả về thông tin người dùng
        resolve({
            err: 0,
            mess: 'Lấy thông tin người dùng thành công',
            user
        });
    } catch (error) {
        reject(error);
    }
});
export const getAllBenhVien = () => new Promise(async (resolve, reject) => {
    try {
        const benhvien = await db.User.findAndCountAll({
            where: {
                role_id: "R2"
            },
        });
        const users = benhvien.rows;
        const counts = benhvien.count;
        // Trả về thông tin người dùng
        resolve({
            err: 0,
            mess: 'Lấy thông tin bệnh viện thành công',
            count: `${counts}`,
            users
        });
    } catch (error) {
        reject(error);
    }
});
export const getAllBacSi = () => new Promise(async (resolve, reject) => {
    try {
        const bacsi = await db.User.findAndCountAll({
            where: {
                role_id: "R3"
            },
        });
        const users = bacsi.rows;
        const counts = bacsi.count;
        // Trả về thông tin người dùng
        resolve({
            err: 0,
            mess: 'Lấy thông tin bác sĩ thành công',
            count: `${counts}`,
            users
        });
    } catch (error) {
        reject(error);
    }
});
export const getAllKhachHang = () => new Promise(async (resolve, reject) => {
    try {
        const khachhang = await db.User.findAndCountAll({
            where: {
                role_id: "R4"
            },
        });
        const users = khachhang.rows;
        const counts = khachhang.count;
        // Trả về thông tin người dùng
        resolve({
            err: 0,
            mess: 'Lấy thông tin khách hàng thành công',
            count: `${counts}`,
            users
        });
    } catch (error) {
        reject(error);
    }
});
export const getAllUser = () => new Promise(async (resolve, reject) => {
    try {
        // Sử dụng phương thức findAll của mô hình User để lấy tất cả người dùng
        const users = await db.User.findAll();

        resolve({
            err: 0,
            mess: 'Lấy thông tin tất cả người dùng thành công',
            users
        });
    } catch (error) {
        reject(error);
    }
});
export const getChuyenKhoa = (id_benhVien) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Sescription.findAndCountAll({
            where: {
                id_benhVien
            },
        });
        // Trả về thông tin người dùng
        const chuyenkhoa = response.rows;
        const counts = response.count;
        resolve({
            err: 0,
            mess: 'Lấy thông tin chuyên khoa thành công',
            count: `${counts}`,
            chuyenkhoa
        });
    } catch (error) {
        reject(error);
    }
});
export const getBacSiByChuyenKhoa = ({ id_chuyenKhoa }) => new Promise(async (resolve, reject) => {
    try {
        console.log(id_chuyenKhoa);

        const users = await db.User.findAll({
            where: {
                id_chuyenKhoa: id_chuyenKhoa  // Thay chuyenKhoaId bằng tên cột thực tế trong bảng User
            }
        });

        if (users.length === 0) {
            resolve({
                err: -1,
                mess: 'Không tìm thấy bác sĩ theo chuyên khoa',
                users: null
            });
            return;
        }

        // Trả về thông tin người dùng
        resolve({
            err: 0,
            mess: 'Lấy thông tin bác sĩ thành công',
            users
        });
    } catch (error) {
        reject(error);
    }
});

export const updateUser = async ({ userId, name, newEmail, newPassword, gioiTinh, sdt, diaChi, image, namSinh }) => {
    try {
        const response = await db.User.update(
            {
                name: name || db.sequelize.literal('name'),
                email: newEmail || db.sequelize.literal('email'),
                password: newPassword ? hashPassword(newPassword) : db.sequelize.literal('password'),
                gioiTinh: gioiTinh || db.sequelize.literal('gioiTinh'),
                namSinh: namSinh || db.sequelize.literal('namSinh'),
                sdt: sdt || db.sequelize.literal('sdt'),
                diaChi: diaChi || db.sequelize.literal('diaChi'),
                avatar: image || db.sequelize.literal('avatar'),
            },
            {
                where: { id: userId },
            }
        );

        if (response === 0) {
            return {
                err: 1,
                mess: 'Người dùng không tồn tại',
            };
        }

        return {
            err: 0,
            mess: 'Cập nhật thông tin người dùng thành công',
        };
    } catch (e) {
        throw e;
    }
};

// export const updateUser = ({ userId,name, newEmail, newPassword, image }) => new Promise(async (resolve, reject) => {
//     try {
//         
//         const user = await db.User.findByPk(userId);
//         if (!user) {
//             resolve({
//                 err: 1,
//                 mess: 'Người dùng không tồn tại'
//             });
//             return;
//         }
//       
//         if (name) {
//             user.name = name;
//         }
//         if (newEmail) {
//             user.email = newEmail;
//         }
//         if (newPassword) {
//             user.password = hashPassword(newPassword);
//         } if (image) {
//             user.avatar = image;
//         }
//         // Lưu các thay đổi vào cơ sở dữ liệu
//         await user.save();

//         resolve({
//             err: 0,
//             mess: 'Cập nhật thông tin người dùng thành công'
//         });
//     } catch (e) {
//         reject(e);
//     }
// });


// Hàm đăng nhập
export const dangNhap = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email },
            raw: true
        })


        // check password
        const isChecked = response && bcrypt.compareSync(password, response.password)
        const token = isChecked ? jwt.sign({
            id: response.id,
            email: response.email,
            role_id: response.role_id,
            id_chuyenKhoa: response.id_chuyenKhoa,
        }, process.env.JWT_SECRET,
            {
                expiresIn: '90d'
            })
            : null
        resolve({
            err: token ? 0 : 1,
            mess: token ? 'Đăng nhập thành công' : response ? 'Mật khẩu sai' : 'Tài khoản chưa được đăng kí',
            'access_token': token ? `${token}` : token
        })
    }
    catch (e) {
        reject(e)
    }
})


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'quocthangforwork@gmail.com',
        pass: 'gtovgcshoqnolyao',
    },
});

// Hàm gửi email để quên mật khẩu
export const forgotPassword = async (email) => {
    const token = crypto.randomBytes(20).toString('hex');
    const user = await db.User.findOne({ where: { email } });
    let errorMessage = null; 
    if (user) {
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 31536000000; // Token hết hạn sau 15p
        await user.save();

        const resetLink = process.env.URL_SERVER + `/api/v1/auth/reset-password/${token}`;
        const mailOptions = {
            from: 'medpro@gmail.com',
            to: email,
            subject: 'Đặt lại mật khẩu',
            html: `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. ${resetLink}`
        };

        await transporter.sendMail(mailOptions);
    } else {
        throw errorMessage = 'Người dùng không tồn tại.';
    }
    return errorMessage;
};

// Hàm đặt lại mật khẩu
export const resetPassword = async (token, newPassword) => {

    const user = await db.User.findOne({
        where: {
            resetToken: token,
            // resetTokenExpiry: { [Sequelize.Op.gt]: Date.now() },
        },
    });

    if (user) {
        const saltRounds = 10; // Số lượng vòng lặp hash
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();
    } else {
        throw new Error('Token không hợp lệ hoặc đã hết hạn.');
    }
};



export const themChuyenKhoa = ({ name, description, id_benhVien, price }) => new Promise(async (resolve, reject) => {
    try {
        const specialization = await db.Sescription.create({
            name,
            description,
            price
        });
        if (id_benhVien) {
            const benhVien = await db.User.findByPk(id_benhVien);

            if (benhVien) {
                // Liên kết chuyên khoa với bệnh viện
                await specialization.update({ id_benhVien: id_benhVien });
            }
        }

        resolve({
            err: false, // Không có lỗi
            mess: 'Thêm mới chuyên khoa thành công !!!',
        });
    } catch (error) {
        reject(error);
    }
});

export const themBacSi = ({ name, email, password, gioiTinh, sdt, diaChi, namSinh, role_id, id_chuyenKhoa, avatar }) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOrCreate({
            where: { email },
            defaults: {
                name,
                email,
                password: hashPassword(password),
                gioiTinh,
                sdt,
                diaChi,
                namSinh,
                role_id,
                avatar
            },
        });
        if (id_chuyenKhoa) {
            const chuyenKhoa = await db.Sescription.findByPk(id_chuyenKhoa);

            if (chuyenKhoa) {
                // Liên kết người dùng với chuyên khoa
                await user[0].update({ id_chuyenKhoa: id_chuyenKhoa });
            }
        }

        resolve({
            err: !user[1], 
            mess: user[1] ? 'Đăng ký thành công' : 'Tài khoản đã tồn tại',
        });

    }
    catch (e) {
        reject(e)
    }
})

export const themLichKham = ({ doctorId, patientId, timeSlot, price, appointmentDate, specialtyId, activateDay }) => new Promise(async (resolve, reject) => {
    try {
        for (const timeSlots of timeSlot) {
            const [startTime, endTime] = timeSlots.split('-');
            const newSchedule = await db.Schedule.findOrCreate({
                where: { doctorId, timeSlot: timeSlots, activateDay },
                defaults: {
                    doctorId,
                    patientId,
                    specialtyId,
                    timeSlot: timeSlots,
                    price,
                    activateDay,
                    appointmentDate,
                    status: 'available',
                    startTime,
                    endTime,
                },
            });
            resolve({
                err: !newSchedule[1],
                mess: newSchedule[1] ? 'Thêm lịch mới thành công' : 'Lịch khám đã tồn tại',
            });
        }
    } catch (e) {
        reject(e);
    }
});

export const datLich = ({ id_lichkham, id_benhNhan }) => new Promise(async (resolve, reject) => {
    try {
        const schedule = await db.Schedule.findOne({ where: { id: id_lichkham } });
        if (!schedule) {
            resolve({
                err: 1,
                mess: 'Lịch khám không tồn tại'
            });
        }
        const checkStatus = schedule.status === 'canceled' || schedule.status === 'completed' || schedule.status === 'booked'
        const check = schedule ? checkStatus : schedule
        schedule.status = 'booked';
        schedule.patientId = id_benhNhan;
        await schedule.save();
        resolve({
            err: schedule ? '1' : '0',
            mess: check ? "Lịch khám đã được đặt" : "Đặt Lịch Thành Công"
        });
    } catch (e) {
        reject(e)
    }
})

export const huyLichKham = ({ id_lichkham }) => new Promise(async (resolve, reject) => {
    try {
        const schedule = await db.Schedule.findOne({ where: { id: id_lichkham } });
        if (!schedule) {
            resolve({
                err: 1,
                mess: 'Lịch khám không tồn tại'
            });
        }
        const checkStatus = schedule.status === 'canceled' || schedule.status === 'completed'
        const check = schedule ? checkStatus : schedule
        schedule.status = 'canceled';
        await schedule.save();
        resolve({
            err: schedule ? '1' : '0',
            mess: check ? "Lịch khám đã được hủy hoặc đã hoàn thành" : "Lịch khám đã được hủy"
        });
    } catch (e) {
        reject(e)
    }
})

export const xacNhanLichKham = ({ id_lichkham }) => new Promise(async (resolve, reject) => {
    try {
        const schedule = await db.Schedule.findOne({ where: { id: id_lichkham } });
        if (!schedule) {
            resolve({
                err: 1,
                mess: 'Lịch khám không tồn tại'
            });
        }
        const checkStatus = schedule.status === 'canceled' || schedule.status === 'completed'
        const check = schedule ? checkStatus : schedule
        schedule.status = 'completed';
        await schedule.save();
        resolve({
            err: schedule ? '1' : '0',
            mess: check ? "Lịch khám đã được hủy hoặc đã hoàn thành" : "Đã xác nhận hoàn thành lịch khám"
        });
    } catch (e) {
        reject(e)
    }
})

export const getLichKham = ({ activateDay, id_doctor }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Schedule.findAndCountAll({
            where: {
                doctorId: id_doctor, activateDay, status: 'available'
            },
            include: [
                {
                    model: db.Sescription,
                    attributes: ['id_benhVien'],
                },
            ],
        });

        const schedule = response.rows.map(row => ({
            id: row.id,
            timeSlot: row.timeSlot,
            id_benhVien: row.Sescription,
        }));

        // Sắp xếp schedule theo thứ tự thời gian từ bé đến lớn
        schedule.sort((a, b) => {
           
            const timeA = parseInt(a.timeSlot.split(':')[0]);
            const timeB = parseInt(b.timeSlot.split(':')[0]);

            
            return timeA - timeB;
        });

        const counts = response.count;

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: counts ? 'Lấy thông tin lịch khám thành công' : "Lấy thông tin lịch khám thất bại",
            count: `${counts}`,
            schedule: counts ? schedule : "Không có lịch khám"
        });
    } catch (error) {
        reject(error);
    }
});
export const getLichKhamById = ({ getSchedulebyID }) => new Promise(async (resolve, reject) => {
    try {
       
        const id = getSchedulebyID
        const Data = await db.Schedule.findByPk(id, {
            include: [
                {
                    model: db.User, 
                    attributes: ['id', 'name', 'sdt', 'diaChi', 'namSinh', 'gioiTinh'],
                },
                {
                    model: db.Sescription, 
                    attributes: ['id', 'id_benhvien', 'name'],
                },
            ],
        });
        //console.log(Data);
        const name = Data.Sescription.dataValues.id_benhvien; // Lấy id_benhvien từ Data
        const UsersFromBenhVien = await db.User.findAll({
            where: {
                id: name,
            },
            attributes: ['name', 'sdt', 'diaChi'],
        });
        if (!Data) {
            resolve({
                err: -1,
                mess: 'Lịch khám không tồn tại',
                Data: null,
            });
            return;
        }

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: 'Lấy thông tin lịch khám thành công',
            Data,
            InforBenhVien: UsersFromBenhVien
        });
    } catch (error) {
        reject(error);
    }
});
export const getLichKhambyBooked = ({ activateDay, id_doctor }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Schedule.findAndCountAll({
            where: {
                doctorId: id_doctor, activateDay, status: 'booked'
            },
            include: [
                {
                    model: db.User, 
                    attributes: ['id', 'name'],
                },
                {
                    model: db.Sescription, 
                    attributes: ['id_benhvien'],
                },
            ],
        });

        const schedule = response.rows.map(row => ({
            id: row.id,
            timeSlot: row.timeSlot,
            activateDay: row.activateDay,
            Users: row.User,
            id_benhVien: row.Sescription
        }));

        // Sắp xếp schedule theo thứ tự thời gian từ bé đến lớn
        schedule.sort((a, b) => {
        
            const timeA = parseInt(a.timeSlot.split(':')[0]);
            const timeB = parseInt(b.timeSlot.split(':')[0]);

            
            return timeA - timeB;
        });

        const counts = response.count;

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: counts ? 'Lấy thông tin lịch khám thành công' : "Lấy thông tin lịch khám thất bại",
            count: `${counts}`,
            schedule: counts ? schedule : "Không có lịch khám"
        });
    } catch (error) {
        reject(error);
    }
});
export const xoaLichKhamById = ({ scheduleId }) => new Promise(async (resolve, reject) => {
    try {
        const deletedSchedule = await db.Schedule.destroy({
            where: { id: scheduleId },
        });

        resolve({
            err: deletedSchedule === 0,
            mess: deletedSchedule === 0 ? 'Không tìm thấy lịch khám' : 'Xóa lịch khám thành công',
        });
    } catch (e) {
        reject(e);
    }
});



export const themLichSuKham = ({ scheduleId, hospitalId, doctorId, patientId, timeSlot, appointmentDate, specialtyId, diagnosis, medication }) => new Promise(async (resolve, reject) => {
    try {
        const schedule = await db.Schedule.findOne({ where: { id: scheduleId } });
        if (!schedule) {
            resolve({
                err: 1,
                mess: 'Lịch khám không tồn tại'
            });
        }
        else {
            schedule.status = 'completed';
            await schedule.save();
            const history = await db.MedicalHistory.create({
                patientId,
                doctorId,
                specialtyId,
                hospitalId,
                timeSlot,
                appointmentDate,
                diagnosis,
                medication,
            });
            resolve({
                err: !history,
                mess: history ? 'Thêm lịch sử khám mới thành công' : 'Lịch sử khám đã tồn tại',
            });
        }
    } catch (e) {
        reject(e);
    }
});

const { Op } = require('sequelize');
export const getLichSuKhamById = ({ getLichSuKhamById, ngay, tenBenhNhan }) => new Promise(async (resolve, reject) => {
    try {
        console.log(getLichSuKhamById)
        
        let whereCondition = { doctorId: getLichSuKhamById };
        if (ngay) {
            whereCondition = { appointmentDate: ngay };
        }
        const Data = await db.MedicalHistory.findAll({
            where: whereCondition,
            include: [
                {
                    model: db.User, 
                    attributes: ['id', 'name', 'sdt', 'diaChi', 'namSinh', 'gioiTinh'],
                    where: {
                        name: {
                            [Op.like]: `%${tenBenhNhan}%`
                        },
                    },
                },
                {
                    model: db.Sescription, 
                    attributes: ['id_benhvien', 'name'],
                },
            ],
        });
        let name;
        Data.forEach((medicalHistory, index) => {
            // medicalHistory.Sescription sẽ chứa thông tin từ bảng Sescription
            if (!name && index === 0) {
                const sescriptionData = medicalHistory.Sescription.dataValues.id_benhvien;
                name = sescriptionData;
                console.log(name)
            }
        });
        console.log(name)
        // const UsersFromBenhVien = await db.User.findAll({
        //     where: {
        //         id: name,
        //     },
        //     attributes: ['name', 'sdt', 'diaChi'],
        // });
        if (!Data) {
            resolve({
                err: -1,
                mess: 'Lịch khám không tồn tại',
                Data: null,
            });
            return;
        }

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: 'Lấy thông tin lịch khám thành công',
            Data,
            //InforBenhVien: UsersFromBenhVien
        });
    } catch (error) {
        reject(error);
    }
});

export const getLichSuKhamBy = ({ getLichSuKhamById, }) => new Promise(async (resolve, reject) => {
    try {
        const Data = await db.MedicalHistory.findAll({
            where: { id: getLichSuKhamById },
            include: [
                {
                    model: db.User, // Sử dụng tên mô hình mặc định 'user'
                    attributes: ['id', 'name', 'sdt', 'diaChi', 'namSinh', 'gioiTinh'],
                    where: {
                        name: {
                            [Op.like]: `%${tenBenhNhan}%`
                        },
                    },
                },
                {
                    model: db.Sescription, // Sử dụng tên mô hình mặc định 'Sescription'
                    attributes: ['id_benhvien', 'name'],
                },
            ],
        });
        let name;
        Data.forEach((medicalHistory, index) => {
           
            if (!name && index === 0) {
                const sescriptionData = medicalHistory.Sescription.dataValues.id_benhvien;
                name = sescriptionData;
                console.log(name)
            }
        });
        console.log(name)
        const UsersFromBenhVien = await db.User.findAll({
            where: {
                id: name,
            },
            attributes: ['name', 'sdt', 'diaChi'],
        });
        if (!Data) {
            resolve({
                err: -1,
                mess: 'Lịch khám không tồn tại',
                Data: null,
            });
            return;
        }

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: 'Lấy thông tin lịch khám thành công',
            Data,
            //InforBenhVien: UsersFromBenhVien
        });
    } catch (error) {
        reject(error);
    }
});

export const deleteUser = ({ userId }) => new Promise(async (resolve, reject) => {
    try {
        const deletedSchedule = await db.User.destroy({
            where: { id: userId },
        });

        resolve({
            err: deletedSchedule === 0,
            mess: deletedSchedule === 0 ? 'Không tìm thấy user ' : 'Xóa user thành công',
        });
    } catch (e) {
        reject(e);
    }
});
export const deleteChuyenKhoa = ({ id_chuyenKhoa }) => new Promise(async (resolve, reject) => {
    try {
        const deletedSchedule = await db.Sescription.destroy({
            where: { id: id_chuyenKhoa },
        });

        resolve({
            err: deletedSchedule === 0,
            mess: deletedSchedule === 0 ? 'Không tìm thấy chuyên khoa ' : 'Xóa chuyên khoa thành công',
        });
    } catch (e) {
        reject(e);
    }
});
