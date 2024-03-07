import { Question } from '../../helpers/types';

import './question.css';

type Props = {
  question: Question;
};

export const QuestionComponent: React.FC<Props> = ({ question }) => (
  <div className="question">{question.question}</div>
);
