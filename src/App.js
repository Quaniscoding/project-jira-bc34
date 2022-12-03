import './App.css';
import '../src/assets/css/main.css';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import Login from './template/user/Login';
import SignUp from './template/user/SignUp';
import Projectmanagement from './pages/index/Projectmanagement';
import CreateProject from './pages/index/CreateProject';
import LayoutAdmin from './template/admin/LayoutAdmin';
import EditProject from './pages/index/EditProject';
import NotFound from './pages/notFound/NotFound';
function App() {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<LayoutAdmin />}>
            <Route path='projectmanagement' element={<Projectmanagement />}></Route>
            <Route path='createProject' element={<CreateProject />}></Route>
            <Route path='projectmanagement/edit/:id' element={<EditProject />}></Route>
          </Route>
          <Route path='/user'>
            <Route path='login' element={<Login />}>
            </Route>
            <Route path='signup' element={<SignUp />}></Route>
          </Route>
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
