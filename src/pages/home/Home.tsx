import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../redux/store';
import {
  resetCurentQuestionId,
  resetCurrentReward,
  resetPassedQuestions,
} from '../../features/questionsSlice';
import questions from '../../data/questions.json';

import logoMobile from '../../assets/quiz-logo-mobile.svg';
import logo from '../../assets/quiz-logo.svg';

import './home.css';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFinal = useSelector((state: RootState) => state.question.isResult);
  const lastRightQuestion = useSelector(
    (state: RootState) => state.question.passedQuestions,
  );

  const reward =
    questions.find((question) => question.id === lastRightQuestion)?.reward ||
    0;

  const handleStart = () => {
    if (isFinal) {
      dispatch(resetPassedQuestions());
      dispatch(resetCurentQuestionId());
      dispatch(resetCurrentReward());
    }
    navigate('game');
  };

  return (
    <div className="home">
      <div className="home__triangle"></div>
      <div className="home-content__container content">
        <div className="content-image__container">
          <img
            src={logoMobile}
            alt="Logo-image"
            className="logo"
            srcSet={`${logoMobile} 320w, ${logo} 1024w`}
          />
        </div>
        <div className="content-text__container home-text">
          <div className="home-text__title">
            {isFinal && <p className="home-text__total-score">Total score:</p>}
            <h1 className="home-text__title">
              {isFinal
                ? `$${reward.toLocaleString('en-US')} earned`
                : 'Who wants to be a millionaire?'}
            </h1>
          </div>
          <button className="home-text__btn" onClick={handleStart}>
            {isFinal ? 'Try Again' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
};
