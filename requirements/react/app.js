import "./index.css"
import React from "react";
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
    return (
      <Router>
        <div>
          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

// You can think of these components as "pages"
// in your app.



function About() {
  return (
    <div>
        <h2>About</h2>
        <h3>This is the last project of 42's common core</h3>
        <h3>Francois - Mathis - Arthur - Dimitri - Ryad</h3>
        <footer>
          <Link to="/">Home</Link>
        </footer>
    </div>
  );
}

// function Dashboard() {
//   return (
//     <form class="form-style-9">
//       <ul>
//         <li>
//           <input type="text" name="field1" class="field-style field-split align-left" placeholder="whoami" />
//         </li>
//         <li>
//           <input type="file" name="field3" class="field-style field-split align-left" placeholder="Phone" />
//         </li>
//         <li>
//           <button type="button" class="button1">enter</button>
//         </li>
//       </ul>
//       <footer>
//           <Link to="/">Home</Link>
//       </footer>
//     </form>
// );
// }

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();

  }

  render() {
    return (
      <form>
      <label>
          whois:
          <input type="text" value={this.state.value} onChange={this.handleChange} /> 
      </label>


      <a href="http://programminghead.com">
      <input type="submit"/>
      </a>
      <input type="submit" value="Submit" />
      {/* <br/>
      <br/>
      <label>
          avatar:
          <input type="file" value={this.state.value} onChange={this.handleChange} />        
      </label> */}

        <footer>
          <Link to="/">Home</Link>
        </footer>
      </form>
    );
  }
}


class MyComponent extends React.Component {

  state = {
      test: []
  }
  componentDidMount() {
    axios.get('http://localhost:8000/')
    .then(res => {
      const test = res.data;
      this.setState({ test });
    })
}
  render() {
      return (
          <ul>
              <h2>{this.state.test}</h2>
          </ul>
      )
  }
}




function Home() {
  const title = "Ft_TRANSCENDENCE"
  return (
      <div>
          <h1>{title}</h1>
        <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-7acb8bb043309e42c98d1a748569d349fa2bf787bda7498802ff84704a6376a0&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FDashboard&response_type=code">
        <button type="button" className="button2">SIGN IN</button>
        </a>
         
          <footer>
            <Link to="/about">About</Link>
          </footer>
      </div>
);
}
