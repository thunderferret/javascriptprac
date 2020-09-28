import mongoose from "mongoose";

mongoose.connect(
    "mongodb://localhost:27017/we-tube",
{
    useNewUrlParser : true,
    useFindAndModify : false
}
);

const db = mongoose.connection;