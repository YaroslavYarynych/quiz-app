/// <reference types="vite-plugin-svgr/client" />
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { Question } from '../../helpers/types';
import { RootState } from '../../redux/store';

import MobileReward from '../../assets/Sidebar-mobile.svg?react';
import Inactive from '../../assets/Inactive.svg?react';
import InactiveMobile from '../../assets/Inactive-mobile.svg?react';
import ActiveDesktop from '../../assets/Active.svg?react';

import './sidebar.css';

type Props = {
  rewards: Question[];
  currentQuestion: number;
  isOpen: boolean;
  isMobile: boolean;
};

export const Sidebar: React.FC<Props> = ({
  rewards,
  currentQuestion,
  isOpen,
  isMobile,
}) => {
  const currentReward = useSelector(
    (state: RootState) => state.question.currentReward,
  );
  return (
    <div
      className={classNames('sidebar', {
        'sidebar--active': isOpen,
      })}
    >
      {rewards.map(({ reward, id }) => (
        <div className="quiz-step" key={id}>
          {currentReward === id ? (
            isMobile ? (
              <MobileReward color="transparent" className="quiz-step__icon" />
            ) : (
              <ActiveDesktop className="quiz-step__icon" />
            )
          ) : isMobile ? (
            <InactiveMobile className="quiz-step__icon" color="#ffffff" />
          ) : (
            <Inactive color="transparent" className="quiz-step__icon" />
          )}
          <p
            className={classNames('quiz-step__text', {
              'quiz-step__text--active': id === currentReward,
              'quiz-step__text--passed': currentQuestion > id,
              'quiz-step__text-mobile': id === currentReward && isMobile,
            })}
          >{`$${reward.toLocaleString('en-US')}`}</p>
        </div>
      ))}
    </div>
  );
};
