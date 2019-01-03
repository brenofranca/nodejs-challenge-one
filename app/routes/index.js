var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.render("index", { title: "NodeJS" });
});

const checkAge = (req, res, next) => {
  if (!req.query.age) return res.redirect("/");
  return next();
};

router.get("/minor", checkAge, function(req, res) {
  const { age } = req.query;
  res.render("minor", { age });
});

router.get("/major", checkAge, function(req, res) {
  const { age } = req.query;
  res.render("major", { age });
});

router.post("/check", function(req, res) {
  if (req.body.age < 18) {
    return res.redirect(`/minor?age=${req.body.age}`);
  }
  return res.redirect(`/major?age=${req.body.age}`);
});

module.exports = router;
