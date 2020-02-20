# This api server is run using Node JS

### Instuctions on how to run the node server below

1. INSTALL NODE.JS (VERSION = 8.16.x) - NPM IS MOSTLY DISTRIBUTED TOGETHER
2. INSTALL PYTHON (VERSION >= 3.6) - PIP IS MOSTLY DISTRIBUTED TOGETHER
+ Alternatively, you can use <br/>
###
      $ sudo apt-get update
      $ sudo apt-get install nodejs
      $ sudo apt-get install npm
      $ sudo apt-get python3-pip

3. AFTER INSTALLING THE ABOVE TWO - RUN THE BELOW SCRIPTS TO INSTALL REQUIRED PACKAGES<br/>
###
      $ pip3 install numpy
      $ pip3 install requirements.txt
      $ npm install -g nodemon
      $ npm install 

4. THE PROGRAM IS READY TO RUN. RUN IT WITH <br/>
###
      $ npm run nodemon (Unit tests are automatically run with above scripts)
+ Alternatively, you can run <br/>
 ###
      $ npm run test (Tests only)
      $ nodemon ./bin/www.js (Run the API server only)

+ Open [http://localhost:4000](http://localhost:4000) to view if the app is live.      


### HOW THE ML MODEL IS TRAINED, PRODUCED AND USED

+ The ML Model is produced via running **ml_model>main.py**
+ The Model used for this prediction task is **Multinomial Naive Bayes**
+ The Best Model is selected via cross validation on the train set with accuracy metrics & final qualification on test set 
+ The Best Model is then subsequently retrained on entire dataset (train + set) for better accuracy of prediction
+ Two Files will be produced **ml_model>mushroom_model.pkl** and **ml_model>remaining_columns.txt** 
+ The Node Server uses the above two files during prediction serving
+ The Node Server spawns child python processes to process data and returns prediction each time API endpoint hit
