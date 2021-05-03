from joblib import load
import sys
from os import path
argumentos = sys.argv
if len(argumentos[1:]) < 4:
    sys.exit("Argumentos invalidos")
ssc = float(sys.argv[1])
hsc = float(sys.argv[2])
degree = float(sys.argv[3])
workex = float(sys.argv[4])

modelo = load(path.join(path.dirname(__file__),'modelo.joblib'))
print(modelo.predict([[ssc,hsc,degree,workex]])[0])

