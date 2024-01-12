const userValidation = (req, res, next) => {
  if (req.body.userName != "" || req.body.password != "") {
    next();
  } else {
    res.status(401).json({ message: "Username or password is missing" });
  }
};

export default userValidation;


