var content = document.getElementById('content')

var highScoreList = [{name: "Jim", score: 22}, {name: "Jon", score: 50}]

var questionList = [
    {
        question: "What declaration MUST be included as the first item in an HTML document before the tag and is used to provide instructions to the web browser?",
        answers: [
            "!DOCTYPE",
            "caption",
            "embed",
            "code"
        ],
        correctAnswer: 1
    },
    {
        question: "What tag is used to underline a word or line of text?",
        answers: [
            "li",
            "ul",
            "s",
            "u"
        ],
        correctAnswer: 4
    },
    {
        question: "Question 3",
        answers: [
            "Variables",
            "Recorders",
            "Strings",
            "Arrays"
        ],
        correctAnswer: 3
    },
    {
        question: "What is the default behavior called that is used to move declarations to the top of the current scope?",
        answers: [
            "Hoisting",
            "Sorting",
            "Jumping",
            "Arranging"
        ],
        correctAnswer: 2
    },
    {
        question: "What property is used to set the horizontal alignment of text or words on a page?",
        answers: [
            "Horizontal-align",
            "Placement",
            "Spacing",
            "Text-align"
        ],
        correctAnswer: 4
    },
]

var questionNum = 0
var sec = 60;

var startQuiz = function(){
   
    var timer = setInterval(function(){
        document.getElementById('timer').innerHTML='Timer: '+sec
        sec--
        if (sec < 0 || questionNum>4) {
            
            clearInterval(timer)
        }
    }, 1000)
    setQuestion()
}
var clearPage = function(){
    while(content.firstChild){
        content.removeChild(content.firstChild)
    }
}

var setHighScore = function(score){
    var name = document.getElementById('name').value
    clearPage()
    var newHighScore = {name: name, score: score}
    highScoreList.push(newHighScore)
    document.getElementById('timer').innerHTML = `Score: ${score}`
    highScores()
}

var endQuiz = function(){
    var score = sec
    if(score < 0){
        score = 0
    }
    clearPage()
    //create score element
    var finalScore = document.createElement('h2')
    finalScore.innerHTML = `Your final score was ${score}. Please enter your name to add to the high score list`
    //create name entry field
    // debugger
    var highScoreButton = document.createElement('button')
    highScoreButton.setAttribute('id', 'endButton')
    highScoreButton.innerHTML = "Submit"
    var highScoreName = document.createElement('input')
    highScoreName.setAttribute('type', 'text')
    highScoreName.setAttribute('id','name')


    content.appendChild(finalScore)
    content.appendChild(highScoreButton)
    content.appendChild(highScoreName)

    setHighScoreEl(score)

}

var setHighScoreEl = function(score){
    document.getElementById('endButton').addEventListener('click', function(e){
        setHighScore(score)
    })
}
var setQuestion = function(){
    if(questionNum > 4){
        console.log("Quiz Over")
        endQuiz()
        return
    }
    clearPage()
    //create question element
    var question = document.createElement('h1')
    question.innerHTML = questionList[questionNum].question
    content.appendChild(question)
    // debugger
    for(var i = 1; i < 5; i++){
        var answer = document.createElement('button')
        answer.innerHTML = questionList[questionNum].answers[i-1]
        answer.setAttribute('id','answer'+i)
        answer.setAttribute('value', i)
        content.appendChild(answer)
    }
    setEls()
}

var setEls = function(){
    for(var i = 1; i < 5; i++){
        document.getElementById('answer'+i).addEventListener('click', function(e){
            checkAnswer(e.target.value)
        })
    }
}

var checkAnswer = function(answer){
    console.log(answer)
    if(answer == questionList[questionNum].correctAnswer){
        console.log("correct")
    } else {
        console.log("Incorrect")
        sec = sec - 5
    }
    questionNum++
    setQuestion()
}

var highScores = function(){
    clearPage()
    //Create High Score Title
    var titleHighScore = document.createElement('h1')
    titleHighScore.innerHTML="High Scores"
    //Create High Score List
    var highScoreOl = document.createElement('ol')
    //sort highscore array
    var sortedHighScores = highScoreList.sort((a,b)=>b.score-a.score)
    //create High Score List Items
    for(var i = 0; i < highScoreList.length; i++){
        var highScoreLi = document.createElement('li')
        highScoreLi.innerHTML = sortedHighScores[i].name + ": " + sortedHighScores[i].score
        highScoreOl.appendChild(highScoreLi)
    }
    //add elements to page
    content.appendChild(titleHighScore)
    content.appendChild(highScoreOl)
}


document.getElementById("startButton").addEventListener("click", startQuiz)
document.getElementById("highScores").addEventListener("click", highScores)