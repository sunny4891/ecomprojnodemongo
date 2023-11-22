function getCategories(req, res) {
  res.status(200).json({ message: "Categories Get api" });
}

function postCategories(req, res) {
  res.status(200).json({ message: "Categories POST api" });
}

function putCategories(req, res) {
  res.status(200).json({ message: "Categories PUT api" });
}

function deleteCategories(req, res) {
  res.status(200).json({ message: "Categories Delete api" });
}

module.exports = {
  getCategories,
  postCategories,
  putCategories,
  deleteCategories,
};
