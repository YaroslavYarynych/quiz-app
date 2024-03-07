import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import App from './App';
import { Home } from './pages/home/Home';
import { Game } from './pages/game/Game';
import { NotFoundPage } from './pages/not-found-page/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="game" element={<Game />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
