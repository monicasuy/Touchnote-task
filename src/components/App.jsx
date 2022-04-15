import '../stylesheets/App.css';
import React from "react";
import Button from './Button'


class App extends React.Component {

    state = {
      items: [],
      DataisLoaded: false,
      currentPage: 1,
      totalPages: 9
    }

    componentDidMount() {
      this.fetchData();
    }

    // Function that will run when Next button is clicked
    // will check if the currentPage is smaller than the number of totalPages, if it is it'll add one to currentPage
    // if it isn't then the currentPage number will be the value of totalPages
    // In the end we fetch data again now that the value of currentPage has been changed
    // so the api URL will potentially have changed
    handleNextClick = () => {
      const { totalPages } = this.state;
      this.setState({
        currentPage: this.state.currentPage > totalPages
        ? totalPages
        : this.state.currentPage + 1
      });
      this.fetchData()
    }


    // Function that will run when the Previous button is clicked and will check if the value of
    // currentPage is smaller than 1, if it is, the currentPage will remain 1 (there is no page 0)
    // if it isn't, the currentPage value will be subtracted 1
    // In the end we call the fetchData function again because the currentPage value will potentially
    // have changed which will affect the api request URL that needs to be fetched in order to
    // change pages
    handlePreviousClick = () => {
      this.setState({
        currentPage:
          this.state.currentPage < 1
            ? 1
            : this.state.currentPage - 1
      });
      this.fetchData()
    };

    // Function that sorts the cards according to mass and saves that into a new variable sortedItems
    // this variable will be used to reassign items in state to be sortedItems now so when the rerendering
    // happens, the .map is using sortedItems to display the cards and therefore will
    // display the cards according to mass instead of the default order from the api
    sortByMass = () => {
      const { items } = this.state;
      const sortedItems = items.sort((a, b) => (parseInt(a.mass) > parseInt(b.mass)) ? 1 : -1)
      this.setState({
        items: sortedItems
      });
    }

    // Function that fetches data from the api
    // we interpolate currentPage in the URL so it can change accordingly when the next
    // and previous buttons are clicked
    // we set items in state to be the "results" part of the json which is where the information we
    // want to iterate through is
    fetchData = () => {
      console.log('fetching data')
      console.log(this.state.currentPage)
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
        // If the data isn't loaded display a message while it loads
        if (!DataisLoaded) return <div>
            <h1> Please wait :) </h1> </div> ;

        return (
        <div className = "App">
          <h1> STAR WARS CHARACTERS </h1>
          <div className="cards"> {
            // We iterate through the data in order to display the name, height and hair colour
                items.map((item) => (
                    <div class="card-character">
                    <h2>{ item.name }</h2>
                    <p><strong>Height:</strong> { item.height }cm</p>
                    <p><strong>Hair colour:</strong> { item.hair_color }</p>
                    </div>
                ))
              }
          </div>
          {/* In the previous button we want to check if the currentPage is 1 or less than 1 in order to disable the button or not */}
          {/* We want the button to be disabled when we're on the first page */}
          {/* We tell the button to run handlePreviousClick function when the button is clicked */}
          <Button disabled={this.state.currentPage <= 1 ? true : false} label="Previous" handleClick={this.handlePreviousClick}/>
          {/* We display the currentPage number */}
          {/* We subtract 1 as an attempt to display the number that is actually being fetched */}
          {/* since the button doesn't start working until the second click so with the first one it'll show the first page still */}
          {/* Otherwise this number was always out of sync with the actual page being shown */}
          <div id="page">{this.state.currentPage - 1}</div>
          {/* In the next button we check if the currentPage is equal or bigger than totalPages in order to disable the button or not */}
          {/* We want the button to be disabled when it reaches the last page */}
          {/* We tell the button to run handleNextClick function when the button is clicked */}
          <Button disabled={this.state.currentPage > this.state.totalPages ? true : false} label="Next" handleClick={this.handleNextClick}/>
          <div>
          {/* The Sort button is never disabled since we want to be able to use it in all pages */}
          {/* We tell the button to run the function sortByMass when clicked so the items will be sorted by mass */}
          {/* And the cards will be displayed according to mass when rerender happens */}
          <Button disabled={false} label="Sort" handleClick={this.sortByMass}/>
          </div>
        </div>
    );
  }
}

export default App;
