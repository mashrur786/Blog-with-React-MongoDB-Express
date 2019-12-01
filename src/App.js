import React from 'react';
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage'
import ArticlesListPage from './pages/ArticlesListPage';
import Article from './pages/Article';
import NavBar from './NavBar';
import NotFoundPAge from './pages/NotFoundPage';


function App() {
  return (
      <Router>
          <div className="App">
              <NavBar />
              <div className="page-body">
                  <Switch>
                    <Route path="/" component={ HomePage } exact />
                    <Route path="/articles" component={ ArticlesListPage } />
                    <Route path="/about" component={ AboutPage } />
                    <Route path="/article/:name" component={ Article } />
                    <Route  component={ NotFoundPAge } />
                  </Switch>
              </div>
          </div>
      </Router>
  );
}

export default App;
