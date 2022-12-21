import './App.css';
import '../src/assets/css/main.css';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import Login from './template/user/Login';
import SignUp from './template/user/SignUp';
import User from './template/user/User/User.jsx';
import Projectmanagement from './pages/index/projectManagement/Projectmanagement';
import CreateProject from './pages/index/createProject/CreateProject';
import LayoutAdmin from './template/admin/LayoutAdmin';
import EditProject from './pages/index/editProject/EditProject';
import NotFound from './pages/notFound/NotFound';
import CreateTask from './pages/task/CreateTask';
import EditTask from './pages/task/EditTask';
import ProjectDetail from './pages/index/projectDetail/ProjectDetail';
function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<LayoutAdmin />}>
          <Route path='projectmanagement' element={<Projectmanagement />} />
          <Route path='createProject' element={<CreateProject />} />
          <Route path='projectmanagement/edit/:id' element={<EditProject />} />
          <Route path='createTask/:id' element={<CreateTask />} />
          <Route path='editTask/:id' element={<EditTask />} />
          <Route path='user' element={<User />}></Route>
        </Route>
        <Route path='/projectDetail/:id' element={<ProjectDetail />} />
        <Route path='login' element={<Login />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
      </Routes>
    </HistoryRouter>

  );
}

export default App;
