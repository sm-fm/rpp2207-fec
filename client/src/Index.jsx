import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './components/App.jsx';
import FetchData from './FetchData.jsx';

const Index = () => {
  const params = useParams();
  const id = params.id || '71697';
  let AppWithFetch = FetchData(App, id);
  useEffect(() => {
    AppWithFetch = FetchData(App, id);
  }, [id]);

  return (
    <AppWithFetch />
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <Router>
    <Routes>
      <Route path='/:id' element={<Index />} />
      <Route path='/' element={<Index />} />
    </Routes>
  </Router>
);