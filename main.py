import eel
from transformers import pipeline

model_name = "deepset/roberta-base-squad2"
nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)

eel.init("web")

# Exposing the function to javascript
@eel.expose
def load_answer(quest, cont):
    print("Computing Answer...")
    QA_input = {"question": str(quest),
             "context": str(cont)}
    return nlp(QA_input)

# Start the index.html file
eel.start("index.html")
