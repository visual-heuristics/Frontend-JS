import React from 'react';
import styles from './index.module.less';


class Template extends React.Component {
    // init data
    constructor(props) {
        super(props);

        this.state = {
            // data that will be used/changed in render function,
            // here to initiate them
            // you can see "state" as an Object.
            
            isButtonClicked: false,
            count: 0,

        }
        // Every function that interfaces with UI and data used 
        // in this class needs to bind like this:
        this.someFunction1 = this.someFunction1.bind(this);
        this.someFunction2 = this.someFunction2.bind(this);
        this.handleOnClickBtn = this.handleOnClickBtn.bind(this);
    }

    someFunction1() {
        return
    }

    someFunction2() {
        return
    }

    handleOnClickBtn() {
        console.log('count =',this.state.count);
        let currentCount = this.state.count;
        // Every time you wants to modify the variables you declared in this.state,
        // You need to use this function.
        this.setState({
            isButtonClicked: true,
            count: currentCount + 1,
        });
    }

    componentDidMount() {
        // this is a function that will automatically be called the first time the component renders 
    }

    componentDidUpdate() {
        // this is a function that will automatically be called each time the component renders
    }

    render() {
        return (
            <div className={styles.template}>
                <p>this is a template component!</p>
                <span>this is a link to <a href="/">homepage</a></span>
                <div>
                    <div>Here is a count button</div>
                    <div>
                        <button onClick={this.handleOnClickBtn}>
                        {
                            this.state.isButtonClicked?
                            "clicked!":"click me"
                        }
                        </button>
                    </div>
                    <div>You have clicked {this.state.count} time(s)!</div>                
                </div>
            </div>
          );
    }
    
  }
  
  export default Template;