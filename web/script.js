/**
 * Empty all the fields and values when contextButton is clicked
 */
document.querySelector("#contextButton").onclick = function () {
    document.querySelector("#context").value = " ";
    document.querySelector("#context").innerHTML = " ";
    document.querySelector("#question").value = " ";
    document.querySelector("#question").innerHTML = " ";
    document.querySelector("#answer").value = " ";
    document.querySelector("#answer").innerHTML = " ";
}

/**
 * Populate context and question with predefined text and trigger the qa model by clicking the answer button
 */
function runTest() {
    document.querySelector("#context").value = "In Question Answering tasks, the model receives a question regarding text content and is required to mark the beginning and end of the answer in the text. If we have a very large set of such texts together with sample questions and the position of the answers in the text, we can train a neural network to learn relationships between context, questions, and answers. The resulting network would be able to answer unseen questions given new contexts which are similar to the training texts. In general, question answering (QA) is a computer science discipline within the fields of information retrieval and natural language processing (NLP), which is concerned with building systems that automatically answer questions posed by humans in a natural language. Machine reading comprehension has captured the minds of computer scientists for decades. The recent production of large-scale labeled datasets has allowed researchers to build supervised neural systems that automatically answer questions posed in a natural language.";
    document.querySelector("#question").value = "What is a question answering system?";
    document.querySelector("#answer").value = " ";
    document.querySelector("#answerButton").click();
  }

/**
 * When answerButton is clicked, take context and question strings and pass them to the python function that will compute the answer,
 * than inspect the outcome to retrieve the answer string and the confidence score. Depending on the amount of confidence, change the progress bar color.
 */
document.querySelector("#answerButton").onclick = function () {
    var question = document.querySelector("#question").value
    var context = document.querySelector("#context").value
    eel.load_answer(question, context)(function (answer) {
        var confidence = Math.round(answer["score"]*100)
        var confidence_string = String(confidence) + "%"
        document.querySelector("#answer").value = answer["answer"];
        document.querySelector("#confidence").style.width = confidence_string;
        if (confidence > 90)
            document.querySelector("#confidence").className = "progress-bar bg-success";
        else if (confidence > 50)
            document.querySelector("#confidence").className = "progress-bar bg-warning";
        else if (confidence <= 50)
            document.querySelector("#confidence").className = "progress-bar bg-danger";
        document.querySelector("#confidence").innerHTML = confidence_string;
    })
}

/**
 * Add key listener to trigger answer when enter is pressed
 */
document.querySelector("#question").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.querySelector("#answerButton").click();
  }
});