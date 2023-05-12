const indexController = (req, res) => {
  res.send({ title: "Express" });
};

module.exports = {
  indexController,
};
