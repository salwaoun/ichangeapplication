let express = require('express'),
  cors = require('cors'),
  serveStatic = require('serve-static'),
 path = require('path'),
  mongoose = require('mongoose'),
  database = require('./database'),
  bodyParser = require('body-parser');
 
// Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(() => {
    console.log("Database connected")
  },
  error => {
    console.log("Database could't be connected to: " + error)
  }
)

const ChalleangeAPI = require('../backend/routes/Challeange.route');
const UsersAPI = require('../backend/routes/Users.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*');
  next();
})
app.use('/', serveStatic(path.resolve(__dirname, '../dist')));

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.resolve(__dirname, '../dist/index.html'))
});
app.use(cors());
// API
app.use('/api', ChalleangeAPI);
app.use('/api/users', UsersAPI);
// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});