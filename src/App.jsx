import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom';

import './styles/App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import UserRecipes from './pages/UserRecipes';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<UserRecipes />} />
    </Switch>
  </Router>
);

export default App;
