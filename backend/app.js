const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()
const db = require("./models");
const compoundRouter = require("./routes/compoundRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


db.sequelize.sync().then(() => {
    console.log("DB synced succesfully!");
}).catch((err) => {
    console.error("Failed to Sync DB: " + err.message);
});



app.use("/v1/api/compound", compoundRouter);

const PORT = process.env.PORT?process.env.PORT:3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});