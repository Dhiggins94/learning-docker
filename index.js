const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  SESSION_SECRET,
  REDIS_PORT,
} = require("./config/config");

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("succesfully connected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
// this part is connecting express session with redis database
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUnintialized: false,
      httpOnly: true,
      // httponly means js cant access the cookies
      maxAge: 60000,
      // maxage is in milliseconds
    },
  })
);

app.use(express.json());

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("<h1>node app is live, thanks docker!!!!!</h1>");
});
// this is so when someone sends a request it'll send it to the post router and reach the routes
// if the api is there its from your own api in case your back and front end is in the same domain and the version is to label which one your working on
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.listen(port, () => console.log(`listening on port ${port}`));

// we're going to user authentication using express sessions(this can also be done with jwt) and we'll be connecting it with a redis database

// docker exec -it learndocker-redis-1 redis-cli will let us connect to our redis database, KEYS * will let us see a session inside the database. since out current max age is 30 seconds.we can see that session for 30 seconds. to see details for a sesioin put GET "{insert key here}"
