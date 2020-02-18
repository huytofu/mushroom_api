var path = require('path');

let PredictionModel = {
    get_python_process_data: async function(data_in, filename){
        //Spawn a python process, write to it and listen for outcoming data
        var py = require('child_process').spawn('python', [path.join(__dirname, filename)]);
        py.stdin.write(data_in)
        py.stdin.end()
        let runPy = await new Promise((resolve, reject)=>{
            py.stdout.on('data', (data)=>{resolve(data)});
            py.stderr.on('data', (data)=>{reject(data);});
        });
        return runPy 
    },
    get_pred: function(input){
        return PredictionModel.get_python_process_data(input, 'python_processes/predict.py')
    },
    process_input: function(input){
        return PredictionModel.get_python_process_data(input, 'python_processes/process.py')
    }
}

module.exports = PredictionModel