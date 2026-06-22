const express = require("express");

const router = express.Router();

const payments =
require("../utils/paymentStore");

router.get(
  "/status/:id",

  (req, res) => {

    const paymentId =
      req.params.id;

    const payment =
      payments[paymentId];

    if (!payment) {

      return res.json({
        status: "processing",
      });

    }

    res.json(payment);

  }
);

module.exports = router;