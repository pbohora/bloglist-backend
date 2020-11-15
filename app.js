const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => logger.info("connected to the database"))
  .catch((error) =>
    logger.error("error connecting to mongoDB: ", error.message)
  );

app.use(cors());

app.use(bodyParser.json());

app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use(express.static("build"));
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
