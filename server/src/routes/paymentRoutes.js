const express = require("express") ;
const {
  createRazorpayOrder,
  verifyRazorpayPayment,
}= require("../controllers/paymentController.js");

const router = express.Router();

router.post("/create-order", createRazorpayOrder);
router.post("/verify", verifyRazorpayPayment);

module.exports = router;

