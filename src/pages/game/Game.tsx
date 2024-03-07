import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Sidebar } from '../../components/sidebar/Sidebar';
import { QuestionComponent } from '../../components/question/Question';
import { Answers } from '../../components/answers/Answers';
import { RootState, useAppDispatch } from '../../redux/store';
import { resetIsResult } from '../../features/questionsSlice';
import questions from '../../data/questions.json';
import answers from '../../data/answers.json';

import Burger from '../../assets/Menu.svg?react';
import Close from '../../assets/Close.svg?react';

import './game.css';

export const Game = () => {
  const [rewards, setRewards] = useState(questions);
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useAppDispatch();
  const currentQuestionId = useSelector(
    (state: RootState) => state.question.currentQuestionId,
  );

  useEffect(() => {
    dispatch(resetIsResult());
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 767) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  const questionToDisplay =
    questions.find((q) => q.id === currentQuestionId) || questions[0];

  const answerToDisplay =
    answers.find((answer) => answer.answer_id === currentQuestionId) ||
    answers[0];

  useEffect(() => {
    const reverseRewards = rewards.sort((a, b) => b.id - a.id);

    setRewards(() => [...reverseRewards]);
  }, []);

  const handleMenu = () => {
    setIsActive((current) => !current);
  };

  return (
    <div className="game">
      <div className="game__container">
        <div className="game__menu">
          {isActive ? (
            <Close className="burger-menu" onClick={handleMenu} />
          ) : (
            <Burger className="burger-menu" onClick={handleMenu} />
          )}
        </div>
        <div className="game__top-container">
          <QuestionComponent question={questionToDisplay} />
        </div>
        <Answers
          answer={answerToDisplay}
          rightAnswer={questionToDisplay.answer}
        />
      </div>
      <Sidebar
        isMobile={isMobile}
        isOpen={isActive}
        currentQuestion={currentQuestionId}
        rewards={rewards}
      />
    </div>
  );
};
