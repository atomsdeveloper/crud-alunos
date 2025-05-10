"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
// Load environment variables from .env file
_dotenv2.default.config();

var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);

var _path = require('path');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);

// Importing the database connection
require('./database/index.js');

// Routes
var _homeRoutejs = require('./routes/homeRoute.js'); var _homeRoutejs2 = _interopRequireDefault(_homeRoutejs);
var _userRoutejs = require('./routes/userRoute.js'); var _userRoutejs2 = _interopRequireDefault(_userRoutejs);
var _tokenRoutejs = require('./routes/tokenRoute.js'); var _tokenRoutejs2 = _interopRequireDefault(_tokenRoutejs);
var _studentRoutejs = require('./routes/studentRoute.js'); var _studentRoutejs2 = _interopRequireDefault(_studentRoutejs);
var _photoRoutejs = require('./routes/photoRoute.js'); var _photoRoutejs2 = _interopRequireDefault(_photoRoutejs);

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://localhost:5173",
    "ws://localhost:5173",
    "wss://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        "http://localhost:5173",
        "https://seu-dominio.vercel.app",
      ],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'", "https:", "data:"],
      formAction: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
};
class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header(
        "Content-Security-Policy",
        "default-src 'self'; connect-src 'self' http://localhost:5173 https://seu-dominio.vercel.app; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' https: data:; form-action 'self'; object-src 'none'; upgrade-insecure-requests"
      );

      next();
    });
    this.app.use(_cors2.default.call(void 0, corsOptions));
    // this.app.use(helmet(helmetOptions));
    this.app.use(_express2.default.json());
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, "uploads")));
  }

  routes() {
    this.app.use("/", _homeRoutejs2.default);
    this.app.use("/users/", _userRoutejs2.default);
    this.app.use("/token/", _tokenRoutejs2.default);
    this.app.use("/students/", _studentRoutejs2.default);
    this.app.use("/photo/", _photoRoutejs2.default);
  }
}

// Exporting the instance of App
// This allows us to use the same instance across the application
exports. default = new App().app;
