import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom';

import './styles/App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import UserRecipes from './pages/UserRecipes';
import DetailRecipe from './pages/DetailRecipe';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<UserRecipes />} />
      <Route path="/recipes/:id" element={<DetailRecipe />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Switch>
  </Router>
);

export default App;
