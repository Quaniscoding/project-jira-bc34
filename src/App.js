import './App.css';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';

function App() {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Routes>
          <Route>
          </Route>
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
