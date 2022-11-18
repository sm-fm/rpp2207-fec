import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hello world</h1>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('app'));
const element = <Index />;
root.render(element);