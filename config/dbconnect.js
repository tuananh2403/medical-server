const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/shopdientu");
    if (conn.connection.readyState === 1) console.log("sucessfully");
    else console.log("failed");
  } catch (error) {
    console.log("DB connection is failed");
    throw new Error(error);
  }
};

module.exports = dbConnect;
