import pickle
import numpy as np
from sklearn.model_selection import train_test_split 
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import confusion_matrix, accuracy_score

def train_model(df_one_hot_features, df_one_hot_class):
    def reshape_classes(y):
        return np.array(y).reshape(len(y))
        
    X_train, X_test, y_train, y_test = train_test_split(
        df_one_hot_features, df_one_hot_class, 
        test_size=0.2, random_state=42
    )
    multi_model = MultinomialNB()
    params = {'alpha': [1, 0.7, 0.4, 0.1]}

    grid = GridSearchCV(multi_model, param_grid=params, scoring='accuracy', cv=4)
    grid.fit(X=X_train, y=reshape_classes(y_train))

    y_preds = grid.best_estimator_.predict(X_test)
    y_trues = reshape_classes(y_test)

    #print(accuracy_score(y_pred=y_preds, y_true=y_trues))
    #print(confusion_matrix(y_pred=y_preds, y_true=y_trues))
    
    if accuracy_score(y_pred=y_preds, y_true=y_trues) > 0.9:
        #If model is good enough, retrain it on the whole dataset
        grid.best_estimator_.fit(X=df_one_hot_features, y=reshape_classes(df_one_hot_class))
        pickle.dump(grid.best_estimator_, open('mushroom_model.pkl', 'wb'))
        
    return grid.best_estimator_