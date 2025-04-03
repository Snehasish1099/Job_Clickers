export default (req, res, next) => {
    if (req.user.role !== "admin") 
        return res.status(403).json({ msg: "Access denied. Only Admins can access." });
    next();
};
