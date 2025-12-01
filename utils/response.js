
let resOtpSend = (res, data) => {
    return res.status(200).send({
        statusCode: "200",
        statusMessage: "OTP sent successfully!",
        data,
    });
};

let resOtpVerify = (res, data) => {
    return res.status(200).send({
        statusCode: "200",
        statusMessage: "OTP verified successfully!",
        data,
    });
};

let resOtpExpired = (res, data) => {
    return res.status(410).send({
        statusCode: "410",
        statusMessage: "OTP Expired!",
        data,
    });
};


let resFound = (res, data) => {
    return res
        .status(200)
        .send({ statusCode: "200", statusMessage: "Document Found!", data });
};



let resNotFound = (res, error) => {
    return res
        .status(203)
        .send({ statusCode: "203", statusMessage: "Document Not Found!", error });
};



let resErrorOccurred = (res, error) => {
    return res
        .status(203)
        .send({ statusCode: "203", statusMessage: "Error Occurred!", error });
};


let resValidationError = (res, error = "", message = "") => {
    return res
        .status(403)
        .send({
            status: "fail",
            statusCode: "403",
            statusMessage: "Validation Error",
            error,
            message: message,
        });
};


module.exports = {
    resNotFound,
    resOtpVerify,
    resErrorOccurred,
    resFound,
    resOtpSend,
    resOtpExpired,
    resValidationError,
};
