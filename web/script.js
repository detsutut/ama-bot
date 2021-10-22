document.querySelector("#contextButton").onclick = function () {
    document.querySelector("#context").value = " ";
    document.querySelector("#context").innerHTML = " ";
    document.querySelector("#answer").value = " ";
}

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

document.querySelector("#question").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.querySelector("#answerButton").click();
  }
});