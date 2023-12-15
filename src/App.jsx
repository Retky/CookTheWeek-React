import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom';

import Header from './components/Header';
import DefaultApp from './pages/DefaultApp';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" element={<DefaultApp />} />
    </Switch>
  </Router>
);

export default App;
