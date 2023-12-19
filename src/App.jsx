import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom';

import './styles/App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" element={<HomePage />} />
    </Switch>
  </Router>
);

export default App;
