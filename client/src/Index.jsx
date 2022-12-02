import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  useSearchParams
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './components/App.jsx';


const root = ReactDOM.createRoot(document.getElementById('app'));
// root.render(<App />);

root.render(
  <Router>
    <Routes>
      <Route path='/:id' element={<App />} />
    </Routes>
  </Router>
);