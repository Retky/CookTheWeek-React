import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from 'react-router-dom';

import './styles/App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import UserRecipes from './pages/UserRecipes';
import DetailRecipe from './pages/DetailRecipe';
import CreateRecipe from './pages/CreateRecipe';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<UserRecipes />} />
      <Route path="/recipes/:id" element={<DetailRecipe />} />
      <Route path="/recipes/new" element={<CreateRecipe />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Switch>
  </Router>
);

export default App;
