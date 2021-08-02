import { Switch, Route, BrowserRouter } from "react-router-dom";
import LandingPage from './components/Pages/LandingPage/LandingPage'
import ResultPage from './components/Pages/ResultPage/ResultPage'
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/search/:searchterm" component={ResultPage} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
