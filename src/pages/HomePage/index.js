import React from "react";
import Home from "./home";


class HomePage extends React.Component {

    // init data
    constructor(props) {
        super(props);

        this.state = {
            // data that will be used/changed in render function

        }
        // Every function that interfaces with UI and data used 
        // in this class needs to bind like this:
        this.handleOnClick = this.handleOnClick.bind(this);
    }


    handleOnClick(num) {
        this.props.history.push('/page'+num)
    }

    // the function that renders a DOM tree and will show the UI on the website
    render(){
        return (
            <div>
                <Home />
            </div>
          );
    }
    
  }
  
  export default HomePage;