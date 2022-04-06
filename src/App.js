//import logo from './logo.svg';
import './App.css';
import React from "react";
class App extends React.Component {

    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    // ComponentDidMount is used to
    // execute the code
    componentDidMount() {
        fetch(
"https://swapi.dev/api/people/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Please wait some time.... </h1> </div> ;

        return (
        <div className = "App">
          <h1> Star Wars Characters </h1>
          <div class="cards"> {
                items["results"].map((item) => (
                    <div class="card-character">
                    <h2>{ item.name }</h2>
                    <p><strong>Height:</strong> { item.height }cm</p>
                    <p><strong>Hair colour:</strong> { item.hair_color }</p>
                    </div>
                ))
              }
          </div>
        </div>
    );
}
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
