require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"BookingCare Vn" <BookingCareVn@support.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyHTMLEmail(dataSend), // html body
    });
};

let getBodyHTMLEmail = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `

        <h3>Xin Chào ${dataSend.patientName} !</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Xin vui lòng xác nhận thông tin bằng cách nhấn vào đường link bên dưới:</p>
        <div><a href=${dataSend.redirectLink} target="_blank">Xác nhận lịch khám</a></div>
        <p>Chúng tôi rất mong được phục vụ bạn. Xin chân thành cảm ơn!</p>
    `;
    }

    if (dataSend.language === "en") {
        result = `
        <h3>Dear ${dataSend.patientName} !</h3>
            <p>You received this email because you booked an online medical appointment on BookingCare</p>
            <p>Information to schedule an appointment:</p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctor: ${dataSend.doctorName}</b></div>
            <p>Please confirm the information by clicking on the link below:</p>
            <div><a href=${dataSend.redirectLink} target="_blank">Confirm Appointment</a></div>
            <p>We look forward to serving you. Thank you!</p>
    `;
    }
    return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `

        <h3>Xin chào ${dataSend.patientName} !</h3>
        <p>Chúc mừng bạn đã thành công trong việc đặt lịch khám bệnh trực tuyến trên BookingCare.</p>
        <p>Chúng tôi gửi đến bạn thông tin chi tiết về đơn thuốc và hóa đơn trong file đính kèm.</p>
        <p>Xin vui lòng kiểm tra và lưu giữ thông tin này cho việc tham khảo sau này.</p>
        <div>Xin chân thành cảm ơn sự tin tưởng của bạn trong dịch vụ của chúng tôi.</div>
    `;
    }

    if (dataSend.language === "en") {
        result = `
        <h3>Hello ${dataSend.patientName} !</h3>
        <p>Congratulations on successfully booking an online medical appointment with BookingCare.</p>
        <p>We are sending you detailed information about your prescription and invoice in the attached file.</p>
        <p>Please review and retain this information for future reference.</p>
        <div>We sincerely appreciate your trust in our services.</div>
    `;
    }
    return result;
};

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            let info = await transporter.sendMail({
                from: '"BookingCare Vn" <BookingCareVn@support.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch khám bệnh", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend), // html body
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId
                            } - ${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: "base64",
                    },
                ],
            });
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    sendSimpleEmail,
    sendAttachment,
};
