const mongoose = require('mongoose');

var validator = {
  isValid: function (str) {
      if (typeof str !== 'string' || !str) {
          return false;
      }
      return true;
  },
  notEmpty: function (str) {
      return str ? true : false;
  },
  isEmail: function (str) {
      if (this.isValid(str)) {
          var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return email.test(str);
      }
      return false;
  },
  isNumber: function (str) {
      if (this.isValid(str)) {
          if (Number(str) && str > 0 ) {
              return true;
          }
          return false;
      }
      return false;
  },
  range: function (str, data) {
      if (this.isValid(str) && Number(str)) {
          var len = str.length;
          if (data instanceof Array) {
              var start = data[0];
              var end = data[1];
              if (end) {
                  return (len >= start && len < end);
              } else {
                  return (len >= start);
              }
          } else {
              return false;
          }
      }
      return false;
  },
  isMongoId: function (str) {
    if (this.isValid(str) ) {
        return mongoose.Types.ObjectId.isValid(str);
    }
    return false
}
}

var validate = function (input, props, type) {
  var error = "";
  for (var k in props) {
      if (props.hasOwnProperty(k)) {
          var inputName = k;
          var validationData = props[k];
          if (validationData) {
              var validationFunction = validationData[0] || notEmpty;
              var errorMessage = validationData[1] || "Please enter input.";
              var options = validationData[2];
              if (!validator[validationFunction](input[inputName], options)) {
                  error = errorMessage;
                  break;
              }
          }
      }
  }
  return error;
}

module.exports = {
  validate: validate,
};