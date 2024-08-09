// Test case 1: When no answer is selected
test('checkAnswer should display an alert when no answer is selected', () => {
  // Arrange
  const alertSpy = jest.spyOn(window, 'alert');
  document.querySelector = jest.fn().mockReturnValue(null);

  // Act
  checkAnswer();

  // Assert
  expect(alertSpy).toHaveBeenCalledWith('Vui lòng chọn một đáp án!');
});

// Test case 2: When the selected answer is correct
test('checkAnswer should display the correct answer message when the selected answer is correct', () => {
  // Arrange
  const selectedAnswer = { value: 'true' };
  document.querySelector = jest.fn().mockReturnValue(selectedAnswer);
  questions[currentQuestionIndex] = {
    answers: [
      { isCorrect: false, answerText: 'Incorrect Answer' },
      { isCorrect: true, answerText: 'Correct Answer' },
    ],
  };
  document.getElementById = jest.fn().mockReturnValue({
    innerHTML: '',
    style: { display: '' },
  });

  // Act
  checkAnswer();

  // Assert
  expect(document.getElementById('correct-answer').innerHTML).toBe(
    '<span class="color_1 fs18"><i class="fa fa-check"></i> Bạn đã chọn đúng!</span>'
  );
});

// Test case 3: When the selected answer is incorrect
test('checkAnswer should display the incorrect answer message when the selected answer is incorrect', () => {
  // Arrange
  const selectedAnswer = { value: 'false' };
  document.querySelector = jest.fn().mockReturnValue(selectedAnswer);
  questions[currentQuestionIndex] = {
    answers: [
      { isCorrect: false, answerText: 'Incorrect Answer' },
      { isCorrect: true, answerText: 'Correct Answer' },
    ],
  };
  document.getElementById = jest.fn().mockReturnValue({
    innerHTML: '',
    style: { display: '' },
  });

  // Act
  checkAnswer();

  // Assert
  expect(document.getElementById('correct-answer').innerHTML).toBe(
    '<span class="color_3 fs18"><i class="fa fa-xmark"></i> Bạn đã chọn sai</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span class="fs18 color_1">Đáp án đúng là: <span class="text-uppercase">Correct Answer</span></span>'
  );
});

// Test case 4: When the correct answer element is displayed
test('checkAnswer should display the correct answer element', () => {
  // Arrange
  const selectedAnswer = { value: 'true' };
  document.querySelector = jest.fn().mockReturnValue(selectedAnswer);
  questions[currentQuestionIndex] = {
    answers: [
      { isCorrect: false, answerText: 'Incorrect Answer' },
      { isCorrect: true, answerText: 'Correct Answer' },
    ],
  };
  const correctAnswerElement = {
    innerHTML: '',
    style: { display: '' },
  };
  document.getElementById = jest.fn().mockReturnValue(correctAnswerElement);

  // Act
  checkAnswer();

  // Assert
  expect(correctAnswerElement.style.display).toBe('block');
});

// Test case 5: When the submit answer container is hidden and next question container is displayed
test('checkAnswer should hide the submit answer container and display the next question container', () => {
  // Arrange
  const selectedAnswer = { value: 'true' };
  document.querySelector = jest.fn().mockReturnValue(selectedAnswer);
  questions[currentQuestionIndex] = {
    answers: [
      { isCorrect: false, answerText: 'Incorrect Answer' },
      { isCorrect: true, answerText: 'Correct Answer' },
    ],
  };
  const submitAnswerContainer = {
    style: { display: '' },
  };
  const nextQuestionContainer = {
    style: { display: '' },
  };
  document.getElementById = jest
    .fn()
    .mockReturnValueOnce(submitAnswerContainer)
    .mockReturnValueOnce(nextQuestionContainer);

  // Act
  checkAnswer();

  // Assert
  expect(submitAnswerContainer.style.display).toBe('none');
  expect(nextQuestionContainer.style.display).toBe('block');
});