import numpy as np
import sklearn as skl
import pandas as pd
import itertools

def process_raw_data():    
    df = pd.read_csv('mushrooms.csv')
    df.dropna(inplace=True)
    df_class = df['class']
    df_features = df.drop(labels=['class'], axis=1)

    df_one_hot_class = pd.get_dummies(df_class, drop_first=True)
    df_one_hot_features = pd.get_dummies(df_features, drop_first=True)
    return df_one_hot_class, df_one_hot_features
    
def exclude_correlated_attributes(df_one_hot_features):
    columns_dropped = []
    correlated = True
    
    while correlated:
        correlated = False
        mymatrix = df_one_hot_features.corr()
        curr_columns = df_one_hot_features.columns
        num_col = len(curr_columns)
        
        for i, j in itertools.combinations_with_replacement(range(num_col),2):
            if i<j and mymatrix.iloc[i][j] >= 0.75:
                correlated = True
                to_drop = curr_columns[i]
                columns_dropped.append(to_drop)
                df_one_hot_features.drop(labels=[to_drop], axis=1, inplace=True)
                break
    sorted_remaining_columns = df_one_hot_features.columns.sort_values()
    df_one_hot_features = df_one_hot_features[sorted_remaining_columns]
    
    with open('remaining_columns.txt', 'w') as f:
        for column in sorted_remaining_columns:
            f.write('{}\n'.format(column))
        f.close()
    
    return df_one_hot_features 