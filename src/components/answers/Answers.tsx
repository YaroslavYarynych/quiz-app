/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { useAppDispatch } from '../../redux/store';
import {
  resetCurentQuestionId,
  resetCurrentReward,
  setCurrentQuestionId,
  setCurrentReward,
  setIsResult,
  setQuestions,
} from '../../features/questionsSlice';
import { Answer } from '../../helpers/types';

import './answers.css';

type Props = {
  answer: Answer;
  rightAnswer: string;
};

export const Answers: React.FC<Props> = ({ answer, rightAnswer }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedAnswerKey, setSelectedAnswerKey] = useState<string | null>(
    null,
  );

  const handleAnswerClick = (key: string) => {
    setSelectedAnswerKey(key);

    if (answer.answer_id === 12) {
      dispatch(setQuestions(answer.answer_id));
      dispatch(setIsResult());
      navigate('/');
    }
    if (rightAnswer === key) {
      setTimeout(() => {
        dispatch(setQuestions(answer.answer_id));
        dispatch(setCurrentQuestionId());
        dispatch(setCurrentReward());
        setSelectedAnswerKey(null);
      }, 300);
    } else {
      setTimeout(() => {
        setSelectedAnswerKey(null);
        dispatch(setIsResult());
        navigate('/');
        dispatch(resetCurentQuestionId());
        dispatch(resetCurrentReward());
      }, 300);
    }
  };

  const answersToShow = Object.entries(answer.options);

  return (
    <ul className="answers">
      {answersToShow.map(([key, value]) => (
        <li
          className="answers__container"
          onClick={() => handleAnswerClick(key)}
          key={key}
        >
          <svg
            className={classNames('answer-icon', {
              'answer-icon--correct':
                rightAnswer === key && selectedAnswerKey === key,
              'answer-icon--incorrect':
                rightAnswer !== key && selectedAnswerKey === key,
            })}
            width="320"
            height="56"
            viewBox="0 0 320 56"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M303 28L320 28" />
            <path d="M0 28L17 28" />
            <path d="M42.1754 0.5H277.825C281.539 0.5 285.024 2.29361 287.183 5.31576L293.593 14.2906L303.386 28L287.183 50.6842C285.024 53.7064 281.539 55.5 277.825 55.5H42.1754C38.4615 55.5 34.9762 53.7064 32.8175 50.6842L16.6145 28L32.8175 5.31576C34.9762 2.29361 38.4615 0.5 42.1754 0.5Z" />
          </svg>

          <p className="answers__text">
            <span className="text-char">{`${key}`}</span>
            <span className="text-content">{`${value}`}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};
