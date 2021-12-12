import {useContext} from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const {user,isAuthenticated} = useContext(AuthContext);
  console.log(user);
  console.log(isAuthenticated);

  return (
    <div className="App">
      <p>PlaceHolder</p>
    </div>
  );
}

export default App;
