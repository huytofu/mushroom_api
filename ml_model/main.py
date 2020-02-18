from process_data import process_raw_data, exclude_correlated_attributes
from train_model import train_model

def main():
    df_class, df_features = process_raw_data()
    df_features = exclude_correlated_attributes(df_features)
    trained_model = train_model(df_features, df_class)
    print('Model Done Training!')

if __name__ == '__main__':
    main()