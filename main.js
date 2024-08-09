function displayQuiz(questions) {
    const quizContainer = document.getElementById('quiz');
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Nộp bài';
    let totalCorrect = 0;

    questions.forEach((question, index) => {
        
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<h3>${question.questionNumber} ${question.questionText}</h3>`;
        if (question.image) {
            const img = document.createElement('img');
            img.src = question.image;
            questionDiv.appendChild(img);
        }
        // Tạo danh sách đáp án dạng radio button
        const answerList = document.createElement('form');
        question.answers.forEach((answer, answerIndex) => {
            const answerId = `answer-${index}-${answerIndex}`;
            const answerLabel = document.createElement('label');
            answerLabel.htmlFor = answerId;
            answerLabel.innerHTML = `
        <input type="radio" name="question-${index}" id="${answerId}">
        <span class="answer-text">${answer.answerText.replace(/<\/?mark>/g, '').replace(/<\/?strong>/g, '')}</span>
      `;
            answerList.appendChild(answerLabel);

            // Lưu trữ thông tin đáp án đúng vào thuộc tính data-correct của input
            if (answer.isCorrect) {
                answerLabel.querySelector('input').dataset.correct = "true";
                // Thêm class 'correct-answer' cho label chứa đáp án đúng (ẩn ban đầu)
                answerLabel.classList.add('correct-answer');
            }

            // Xử lý sự kiện khi người dùng click vào input
            answerLabel.querySelector('input').addEventListener('click', () => {
                // Hiển thị kết quả cho đáp án được chọn
                if (answer.isCorrect) {
                    answerLabel.querySelector('.answer-text').style.color = 'green';
                } else {
                    answerLabel.querySelector('.answer-text').style.color = 'red';
                }

                // Hiển thị đáp án đúng
                answerList.querySelectorAll('.correct-answer .answer-text').forEach(correctAnswer => {
                    correctAnswer.style.fontWeight = 'bold';
                    correctAnswer.style.color = 'green';
                });
            });
        });

        questionDiv.appendChild(answerList);
        quizContainer.appendChild(questionDiv);

    });



}

// Lấy dữ liệu từ file JSON và hiển thị
fetch('questions/question_cdsv.json')
    .then(response => response.json())
    .then(questions => {
        displayQuiz(questions);
        
    });

window.addEventListener('scroll', function () {
    var quiz = document.getElementById('quiz');
    var scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    // Kiểm tra xem người dùng đã cuộn đến cuối trang chưa
    var scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

    // Nếu người dùng chưa cuộn đến cuối trang, cập nhật chiều cao của #quiz
    if (!scrolledToBottom) {
        quiz.style.height = scrollHeight + 'px';
    }
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


