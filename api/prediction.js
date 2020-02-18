var express = require('express');
var router = express.Router();
var generalHelper = require('../helpers/general');
var PredictionController = require('../controllers/prediction')

router.get('/get-mushroom-edibility-prediction', (req, res, next)=>{
    let fields = [{key : 'mushroom_data', required: true}];
    generalHelper.getReqFields(req, res, next, fields);
  }, (req, res)=>{
    let input = JSON.stringify(req.fieldValues.mushroom_data);
    //Transforming data from key value pairs to boolean features
    PredictionController.get_mushroom_prediction(input, (err, result)=>{
        if(!err){
            return generalHelper.api_mw_createRes(
                req, res, 200, 'prediction',
                {label: result}, '1-generic-001'
            );
        } else {
          return generalHelper.api_mw_createRes(
              req, res, 500, 'prediction',
              {}, '2-generic-001'
          );
        }
    });
});

router.get('/get-mushroom-historical-predictions', (req, res, next)=>{
    let fields = [{key : 'num_last', required: true}]
    generalHelper.getReqFields(req, res, next, fields);
  }, (req, res)=>{
    let input = req.fieldValues.num_last;
    let {err, result} = PredictionController.load_past_preds(input);
    if(!err){
        return generalHelper.api_mw_createRes(
            req, res, 200, 'historical_predictions',
            {predictions: result},  '1-generic-002'
        );
    } else {
        return generalHelper.api_mw_createRes(
            req, res, 500, 'prediction',
            {}, '2-generic-001'
        );
    }
})

module.exports = router;