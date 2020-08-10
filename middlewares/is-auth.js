const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if(!token){
    return res.status(401).json({
      msg: "No Token, authorization is denied."
    });
  }

  try{
    const verified = jwt.verify(token, config.get('jwtSecret'));
    req.user = verified.user;
    next();
  } catch(error) {
    res.status(401).json({
      msg: "Tokens is not valid"
    })
  }

  const verified = jwt.verify(token, config.get("jwtSecret"));
};
