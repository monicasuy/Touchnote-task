//import logo from './logo.svg';
import '../stylesheets/App.css';
import React from "react";
import Button from './Button'
// import ReactPaginate from 'react-paginate';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

class App extends React.Component {

    // Constructor

    state = {
      items: [],
      DataisLoaded: false,
      offset: 0,
      currentPage: 1,
      totalPages: 9
    }

    componentDidMount() {
      console.log('in componentdidmount')
      this.fetchData();
    }

    handleNextClick = () => {
      const { totalPages } = this.state;
      console.log('hi')

      this.setState({
        currentPage:
          this.state.currentPage > totalPages
            ? totalPages
            : this.state.currentPage + 1
      });
      this.fetchData()
    }



    handlePreviousClick = () => {
      this.setState({
        currentPage:
          this.state.currentPage < 1
            ? 1
            : this.state.currentPage - 1
      }); this.fetchData()

    };

    sortByMass = () => {
      console.log('hi')
      const { items } = this.state;
      const sortedItems = items.sort((a, b) => (parseInt(a.mass) > parseInt(b.mass)) ? 1 : -1)
      this.setState({
        items: sortedItems
      });
      console.log(sortedItems);
    }

    fetchData = () => {
      console.log('fetching data')
      fetch(
`https://swapi.dev/api/people/?page=${this.state.currentPage}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json["results"],
                    DataisLoaded: true
                });
            })
    }


    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Please wait some time.... </h1> </div> ;

      console.log('rendering');
        return (
        <div className = "App">
          <h1> Star Wars Characters </h1>
          <div className="cards"> {
                items.map((item) => (
                    <div class="card-character">
                    <h2>{ item.name }</h2>
                    <p><strong>Height:</strong> { item.height }cm</p>
                    <p><strong>Hair colour:</strong> { item.hair_color }</p>
                    <p><strong>Mass:</strong> { item.mass }</p>
                    </div>
                ))
              }
          </div>
          <Button disabled={this.state.currentPage <= 1 ? true : false} label="Previous" handleClick={this.handlePreviousClick}/>
          <div>{this.state.currentPage}</div>
          <Button disabled={this.state.currentPage >= this.state.totalPages ? true : false} label="Next" handleClick={this.handleNextClick}/>
          <Button disabled={false}label="Sort" handleClick={this.sortByMass}/>
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
