import pkg from 'jsonwebtoken';
const { verify } = pkg;

export default (req, res, next) => {

    const token = req.header("Authorization");
    
    if (!token) {
        return res.status(401).json({ msg: "Access denied. No token found" });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ msg: "Invalid token" });
    }
};
