var historical_predictions = [];
var moment = require('moment');
var PredictionModel = require('../models/prediction');

let PredictionController = {
    load_past_preds: function(num_preds){
        num_preds = parseInt(num_preds);
        if(typeof num_preds === typeof(1)){
            if(num_preds < historical_predictions.length){
                return {err: false, result: [...historical_predictions].splice(-num_preds)};
            }
            return {err: false, result: historical_predictions};
        } else {
            return {err: true, result: null};
        }
    },
    get_mushroom_prediction: (input, callback)=>{
        PredictionModel.process_input(input).then(new_input=>({new_input, err: null})).catch(err=>({new_input: null, err})).then(myresult=>{
            let {new_input, err} = myresult;
            new_input = new_input.toString();
            //get prediction of edibility based on the transformed data
            PredictionModel.get_pred(new_input).then(data_out=>({data_out, err: null})).catch(err=>({data_out: null, err})).then(result=>{
                let {data_out, err} = result;
                data_out = data_out.toString();
                let current = moment().format('YYYY-MM-DD HH:mm:ss');
                //Add to list of historical predictions. Capped at 100 past preds
                historical_predictions.push([data_out, current, input])
                if(historical_predictions.length > 50){
                    historical_predictions.shift();
                }
                callback(err, data_out);
            });
        });
    }
}

module.exports = PredictionController;