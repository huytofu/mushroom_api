### This api server is run using Node JS

## Instuctions on how to run the node server below

1. INSTALL NODE.JS (VERSION = 8.16.x) - NPM IS DISTRIBUTED TOGETHER
2. INSTALL PYTHON (VERSION >= 3.6) - PIP IS DISTRIBUTED TOGETHER   
### You can use
$ sudo apt-get python3-pip

3. AFTER INSTALLING THE ABOVE TWO - RUN THE BELOW SCRIPTS TO INSTALL REQUIRED PACKAGES
$ pip3 install numpy 
$ pip3 install requirements.txt
$ npm install -g nodemon
$ npm install 

4. THE PROGRAM IS READY TO RUN. RUN IT WITH 
$ npm run nodemon 
(Unit tests are automatically run with above scripts)
+ Alternatively, you can run 
$ npm run test (Tests only)
$ nodemon ./bin/www.js (Run the API server only)

5. How the ML Model is produced
+ The ML Model is produced via running **ml_model>main.py**
+ Two files will be produced **ml_model>mushroom_model.pkl** and **remaining_columns.txt** 
for the node program to use 
+ The node program spawns child python processes to processes data and returns prediction 
whenever the prediction API endpoint is called