import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './utils/db/apolloClient'
import NotFound from './pages/NotFound';
import Home from "./pages/home/Home"
import Login from './components/login/Login';
import Register from './components/login/Register';
import GameOverlay from './GameOverlay';


function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Routes>
            <Route 
              path="/" 
              element={<Home />}
            />
            <Route path="/login" 
            element={<Login />} />

            <Route path="/register" 
            element={<Register />} />
            {/* <Route 
              path="/game"
              element={< />} 
            /> */}
            <Route 
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
