const { app } = require("./server");

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `my server is running on port number ${process.env.PORT || 3000}`
  );
});
