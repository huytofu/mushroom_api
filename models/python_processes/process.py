import pandas as pd 
import pickle
import os
import json
import sys

def load_columns():
    path = os.path.join(os.getcwd(), 
        'ml_model/remaining_columns.txt'
    )
    with open(path, 'r') as f:
        data = [column.replace('\n','') for column in f.readlines()]
        return data
        
def get_data_from_input(myarr, column):
    if column in myarr.keys():
        return 1
    return 0

def main():
    lines = sys.stdin.readlines()
    myarr = json.loads(lines[0])
    myarr = { a+'_'+str(b['value']): True for a,b in myarr.items()}
    
    model_columns = load_columns()
    new_data = list(map(lambda x: get_data_from_input(myarr, x), model_columns))
    print(new_data)
    # print(type(myarr))
    sys.stdout.flush()
    
if __name__ == '__main__':
    main()
    
    
        
    

    