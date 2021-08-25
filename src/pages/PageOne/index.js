import React from "react";
import Sample from "@/components/sample/Sample";
import Count from "@/components/Template";

class PageOne extends React.Component {
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

    handleOnClick() {
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <div>Hello Page one!</div> 
                <Sample/>
                <div>
                    <button onClick={this.handleOnClick}>to homepage</button>
                </div>
                <Count/>
            </div>
            
          );
    }
    
  }
  
  export default PageOne;