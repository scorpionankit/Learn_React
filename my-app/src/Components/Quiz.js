import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import { buttonActivate } from '../utils/carouselButtonSlice';

const questions = [
  {
    questionNumber : 1,
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Rome', 'Berlin'],
    answer: 'Paris'
  },
  {
    questionNumber : 2,
    question: 'What is the largest planet in our solar system?',
    options: ['Jupiter', 'Saturn', 'Neptune', 'Earth'],
    answer: 'Jupiter'
  },
  {
    questionNumber : 3,
    question: 'Who painted the Mona Lisa?',
    options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
    answer: 'Leonardo da Vinci'
  },
  {
    questionNumber : 4,
    question: 'What is the chemical symbol for gold?',
    options: ['Au', 'Ag', 'Fe', 'Cu'],
    answer: 'Au'
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const dispatch = useDispatch();
 

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setSelectedOption('');
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      dispatch(buttonActivate());
      setShowScore(true);
    }
  };
  const totalQuestion = 4;

  return (
    <div>
      {showScore ? (
        <div className="text-center ">
          <h1 className="text-4xl font-bold mb-4">Quiz Complete!</h1>
          <p className="text-2xl font-semibold">Your score: {score}/{questions.length}</p>
        </div>
      ) : (
        <div className="text-center">
        <span className='text-4xl font-bold mb-4'>{questions[currentQuestion].questionNumber}/{totalQuestion}</span>
          <h1 className="text-4xl font-bold mb-4">{questions[currentQuestion].question}</h1>
          <div className="flex justify-center">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`bg-blue-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded m-2 ${
                  selectedOption === option ? 'bg-blue-200 text-black' : ''
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
            onClick={handleNextQuestion}
            disabled={!selectedOption}
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
