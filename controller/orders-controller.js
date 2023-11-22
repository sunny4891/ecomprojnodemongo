function getOrders(req, res) {
  res.status(200).json({ message: "Orders Get api" });
}

function postOrders(req, res) {
  res.status(200).json({ message: "Orders POST api" });
}

function putOrders(req, res) {
  res.status(200).json({ message: "Orders PUT api" });
}

function deleteOrders(req, res) {
  res.status(200).json({ message: "Orders Delete api" });
}

module.exports = {
  getOrders,
  postOrders,
  putOrders,
  deleteOrders,
};
