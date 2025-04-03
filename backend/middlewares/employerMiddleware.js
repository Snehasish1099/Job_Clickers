export function isEmployer(req, res, next) {
    if (req.user.role !== "employer") {
      return res.status(403).json({ error: "Access denied. Employers only." });
    }
    next();
  }