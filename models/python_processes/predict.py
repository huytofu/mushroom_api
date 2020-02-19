import pickle
import json
import sys
import os
sys.path.append(os.path.join(os.getcwd(), 'python-packages'))
import numpy as np

def get_model():
    model_dir = os.path.join(os.getcwd(), 'ml_model/mushroom_model.pkl')
    model = pickle.load(open(model_dir, 'rb'))
    return model

def get_class(num):
    class_dict = {0: 'edible', 1: 'poisonous'}
    return class_dict[num]

def main():
    lines = sys.stdin.readlines()
    myarr = json.loads(lines[0])
    model = get_model()
    
    x = model.predict(np.array(myarr).astype(np.float32).reshape(1, -1)) 
    print(get_class(x[0]))
    # print(type(myarr))
    sys.stdout.flush()
    
if __name__ == '__main__':
    main()