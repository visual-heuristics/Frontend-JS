import React from "react";
import { Link } from 'react-router-dom';
import Home from "./home";
import styles from './index.module.less';
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
                {/* <div>
                    <button onClick={()=>this.handleOnClick('1')}
                            className={styles.btn}>
                            to page 1
                    </button>
                </div>
                <div>
                    <button onClick={()=>this.handleOnClick('2')}>to page 2</button>
                </div>
                <div>
                    <button onClick={()=>this.handleOnClick('3')}>to page 3</button>
                </div>
                <div>
                    <button onClick={()=>this.handleOnClick('4')}>to page 4</button>
                </div> */}
            </div>
          );
    }
    
  }
  
  export default HomePage;