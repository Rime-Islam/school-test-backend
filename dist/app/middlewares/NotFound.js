import httpStatus from "http-status";
const NotFound = (req, res, next) => {
    return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Not Found",
    });
};
export default NotFound;
//# sourceMappingURL=NotFound.js.map