import './App.css';
import { Routes, Route, useLocation} from "react-router-dom";
//import { Route, Switch, BrowserRouter } from "react-router-dom";
import Landing from './components/ladingPage/landing';
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";
//import NotFound from './components/notfound/NotFound';


function App() {
  let location= useLocation()
  return (
    <div className={location.pathname === "/" && "Landing"}>
      <Routes>
        <Route path= "/" element={<Landing/>} />
        <Route path= "/home" element={<Home/>} />
        <Route path= "/detail/:id" element={<Detail/>} />
        <Route path= "/createDogs" element={<Form/>} />
      </Routes>
    </div>
  );
}

/*function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Landing/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/dog-detail/:id">
            <Detail/>
          </Route>
          <Route exact path="/dog">
            <Form/>
          </Route>
          <Route exact path="*">
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}*/


export default App;
