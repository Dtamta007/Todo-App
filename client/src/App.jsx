import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Todos from './components/Todos';
import Admin from './components/Admin';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/login' element={<UnPrivateRoute><Login/></UnPrivateRoute>} />
        <Route path="/register" element={<UnPrivateRoute><Register/></UnPrivateRoute>} />
        <Route path="/todos" element={<PrivateRoute roles={['admin','user']}><Todos /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute roles={['admin']}> <Admin /> </PrivateRoute> }/>
      </Routes>
    </Router>
  );
}

export default App;
