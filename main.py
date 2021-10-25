# backend file(s) = python
import eel
from transformers import pipeline

# Set NLP pipeline
model_name = "deepset/roberta-base-squad2"
nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)

# Init eel specifying the directory where the frontend files are located 
eel.init("web")

# Any functions decorated with @eel.expose will appear as methods on the eel object on the Javascript side
# N.B: you can do also the other way around with eel.expose(my_javascript_function)
@eel.expose
def load_answer(quest, cont):
    print("Computing Answer...")
    QA_input = {"question": str(quest),
             "context": str(cont)}
    return nlp(QA_input)

# This will start a webserver on the default settings (http://localhost:8000) and open a browser to http://localhost:8000/index.html.
eel.start("index.html", size=(1200,800))
