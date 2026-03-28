const allowFinderOnly = (req, res, next) => {
    if(req.user.role !== "finder") {
        return res.status(403).json({
            success: false,
            message: "only finder can book services"
        });
    }
    next();
};
module.exports = allowFinderOnly;