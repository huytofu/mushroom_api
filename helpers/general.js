let generalHelper = {
    getReqValue: function(req, valueKey, method){
        let reqValue = null;
        if(method.toLowerCase() === 'get'){
            reqValue = req.params[valueKey] || req.body[valueKey] || req.query[valueKey] || '';
        }
        return reqValue
    },
    isEmpty: function(value){
      if (
        typeof(value) === 'undefined' ||
        typeof(value) === 'null' || 
        value === ''
      ) { return true; }
      return false;
    },
    getReqFields: function(req, res, next, fields){
      let reqValues = {};
      fields.forEach(field=>{
        let key = field.key;
        let isRequired = field.required;
        let method = field.method || req.method;
        let value = generalHelper.getReqValue(req, key, method);
        if(isRequired && generalHelper.isEmpty(value)){
          return generalHelper.api_mw_createRes(req, res, 400, {
              'error': key + ' field missing/invalid.'
          }, '2-generic-001');
        } else {
          reqValues[key] = value;
        }
      });
      req.fieldValues = reqValues;
      next();
    },
    api_mw_createRes: function(req, res, httpCode, template, data, messageCode) {
        var httpCode = (httpCode === undefined || httpCode === null) ? 200 : httpCode,
            data = (data === undefined || data === null) ? {} : data,
            template = (template === undefined || template === null) ? 'error' : template,
            status = (httpCode >= 200 && httpCode < 400) ? 'ok' : 'error',
            messageCode = (messageCode === undefined || messageCode === null) ? '' : messageCode,
            messageList = require('../locales/en/message'),
            message = messageList[messageCode];
        
        if(messageCode && message && status !== 'ok'){
            message += ' Error code: ' + messageCode;
        }
        var response = {
            status: status,
            http_code: httpCode,
            message: message,
            message_code: messageCode,
            data: data
        }
        return res.status(httpCode).json(response);
        // res.render(template, data);
    }
}

module.exports = generalHelper;
