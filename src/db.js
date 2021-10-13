import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/company-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("db is connected"))
  .catch((err) => console.log(err));
