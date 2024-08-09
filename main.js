let currentQuestionIndex = 0;
let questions = [];  // Danh sách câu hỏi từ JSON
let totalCorrect = 0;

document.getElementById('submit-answer').addEventListener('click', checkAnswer);
document.getElementById('next-question').addEventListener('click', loadNextQuestion);

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-number').innerText = `Câu ${currentQuestionIndex + 1}`;
    document.getElementById('question-text').innerText = question.questionText;

    const answerList = document.getElementById('answer-list');
    answerList.innerHTML = ''; // Xóa các đáp án trước

    question.answers.forEach((answer, index) => {
        const answerId = `answer-${index}`;
        const answerLabel = document.createElement('label');
        answerLabel.htmlFor = answerId;
        answerLabel.innerHTML = `
            <input type="radio" name="answer" id="${answerId}" value="${answer.isCorrect}">
            <span>${answer.answerText}</span>
        `;
        answerList.appendChild(answerLabel);
    });

    document.getElementById('correct-answer').style.display = 'none';
    document.getElementById('submit-answer-container').style.display = 'block';
    document.getElementById('next-question-container').style.display = 'none';
}

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        alert('Vui lòng chọn một đáp án!');
        return;
    }

    const isCorrect = selectedAnswer.value === 'true';
    const correctAnswerText = questions[currentQuestionIndex].answers.find(answer => answer.isCorrect).answerText;

    const correctAnswerElement = document.getElementById('correct-answer');
    if (isCorrect) {
        correctAnswerElement.innerHTML = '<span class="color_1 fs18"><i class="fa fa-check"></i> Bạn đã chọn đúng!</span>';
        totalCorrect++;
    } else {
        correctAnswerElement.innerHTML = '<span class="color_3 fs18"><i class="fa fa-xmark"></i> Bạn đã chọn sai</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span class="fs18 color_1">Đáp án đúng là: <span class="text-uppercase">' + correctAnswerText + '</span></span>';
    }

    correctAnswerElement.style.display = 'block';
    document.getElementById('submit-answer-container').style.display = 'none';
    document.getElementById('next-question-container').style.display = 'block';
}

function loadNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        document.getElementById('correct-answer').style.display = 'none';
        document.getElementById('next-question-container').style.display = 'none';
        document.getElementById('submit-answer-container').style.display = 'block';
    } else {
        document.getElementById('quiz-container').innerHTML = `<p>Bạn đã trả lời đúng ${totalCorrect} trong tổng số ${questions.length} câu hỏi.</p>`;
    }
}

// Tải câu hỏi từ tệp JSON và hiển thị câu hỏi đầu tiên
fetch('questions/question_cdsv.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        displayQuestion();
    });


// Lấy phần tử nút "On Top"
var onTopBtn = document.getElementById("onTopBtn");

// Hiển thị nút khi người dùng cuộn xuống 100px từ đỉnh trang
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        onTopBtn.style.display = "block";
    } else {
        onTopBtn.style.display = "none";
    }
}

// Khi người dùng nhấp vào nút, cuộn lên đầu trang
onTopBtn.onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


