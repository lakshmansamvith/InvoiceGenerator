import React, { Component } from 'react';
import { Container } from '@mui/material';
import './index.css';
import InvoiceForm from './Components/InvoiceForm'

export default class App extends Component {
  render() {
    return (
      <div className="App d-flex flex-column align-items-center justify-content-center w-100">
        <Container>
          <InvoiceForm />
        </Container>
      </div>
    );
  }
}
