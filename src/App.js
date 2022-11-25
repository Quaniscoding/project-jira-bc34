import './App.css';
import '../src/assets/css/main.css';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import Login from './template/user/Login';
import SignUp from './template/user/SignUp';
function App() {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Routes>
          <Route path='login' element={<Login />}>
          </Route>
          <Route path='signup' element={<SignUp />}></Route>
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
