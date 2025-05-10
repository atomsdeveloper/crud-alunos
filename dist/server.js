"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _appjs = require('./app.js'); var _appjs2 = _interopRequireDefault(_appjs);

const PORT = 3000;

// Start the server
_appjs2.default.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
