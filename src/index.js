import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      countries: []
    };
  }

  componentDidMount() {
    fetch("https://api.github.com/users/coma/repos")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res && res.length > 0) {
          this.setState({ countries: res });
        }
      });
  }

  // sets state, triggers render method
  handleChange = (event) => {
    // grab value form input box
    this.setState({ searchString: event.target.value });
  };
  render() {
    var countries = this.state.countries;
    var searchString = this.state.searchString.trim().toLowerCase();
    // filter countries list by value from input box
    if (searchString.length > 0) {
      countries = countries.filter((country) => {
        return country.name.toLowerCase().match(searchString);
      });
    }

    return (
      <div>
        <div className="firstDiv">
          <label> </label>
          <input
            type="text"
            value={this.state.searchString}
            onChange={this.handleChange}
            placeholder="Search!"
          />
          <ul>
            {countries.map((country) => {
              return <li>{country.name} </li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
