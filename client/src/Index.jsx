import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './components/App.jsx';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hello world</h1>
      // adding comment for test with pull request
      //adding additional comment for second test with pull request
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);