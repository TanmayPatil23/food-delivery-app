const router = require("express").Router();
const {
  login,
  signUp,
  validateEmailToken,
  sendConfirmationEmail,
} = require("../controllers/authControllers");
const { checkDuplicatedEmail } = require("../middlewares/verifySingUp");
const { verifyAccountConfirmartion } = require("../middlewares/authJwt.js");
const { checkIsValidUser } = require("../middlewares/userValidator");

router.post("/singup", [checkDuplicatedEmail, checkIsValidUser], signUp);
router.get("/verification/:token", validateEmailToken);
router.post("/confirmation", sendConfirmationEmail);
router.post("/login", verifyAccountConfirmartion, login);

module.exports = router;
