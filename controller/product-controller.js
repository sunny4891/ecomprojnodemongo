function getProduct(req, res) {
  res.status(200).json({ message: "Product Get api" });
}

function postProduct(req, res) {
  res.status(200).json({ message: "Product POST api" });
}

function putProduct(req, res) {
  res.status(200).json({ message: "Product PUT api" });
}

function deleteProduct(req, res) {
  res.status(200).json({ message: "Product Delete api" });
}

module.exports = {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};
