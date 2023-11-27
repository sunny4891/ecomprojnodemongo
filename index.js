require("dotenv").config();

const { app } = require("./server");
require("./logger/logger");
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `my server is running on port number ${process.env.PORT || 3000}`
  );
});
