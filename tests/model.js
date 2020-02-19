var num_features = null;
const fs = require('fs');
const assert = require('chai').assert;
const PredictionModel = require('../models/prediction');
fs.readFile('./ml_model/remaining_columns.txt', 'utf8', (err, data)=>{
   num_features = data.trim().split('\n').length
})

describe.only('Unit Tests For Model -> Prediction', function () {

	it('PredictionModel.process_input (should pass)', (done) => {
		let input_data = JSON.stringify({"cap-surface":{"value":"s"}, "gill-color":{"value":"w"}}); //Zave Standard plan
		PredictionModel.process_input(input_data)
    .then(result=>({result, err: null}))
    .catch(err=>({result: null, err}))
    .then(response=>{
        let {result, err} = response;
        err? console.log(err.toString()): console.log(result.toString())
        result = JSON.parse(result.toString());
        assert.isNull(err);
  			assert.isNotNull(result);
  			assert.isArray(result);
        assert.sameMembers(Array.from(new Set(result)), [0,1])
  			done();
    });
	});

	it('PredictionModel.get_pred (should pass)', (done) => {
    let input_data = JSON.stringify(new Array(num_features).fill(0).map(
        num=>{return Math.round(Math.random(0,1))}
    ));
    PredictionModel.get_pred(input_data)
			.then(result => ({err: null, result}))
			.catch(err => ({err, result: null}))
			.then(response => {
				let {err, result} = response;
        err? console.log(err.toString()): console.log(result.toString())
        result = result.toString();
				assert.isNull(err);
				assert.isNotNull(result);
        assert.oneOf(result, ['edible\n','poisonous\n']);
				done();
			});
	});

});
