import React from 'react';
import Form from './formComponent.jsx';

export default class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md mt-3">
            <h1>Contact Form</h1>
            <Form />
          </div>
        </div>
      </div>
    );
  }
}
