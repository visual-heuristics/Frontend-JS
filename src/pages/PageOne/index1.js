import React from "react";
import Dropzone from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const container = {
	width: "100%",
	height: "100%",
	backgroundColor: "#FFFFFF"
}
/* Navigation */
const header = {
	width: "100%",
	height: "50px",
	backgroundColor: "#52bad5"
}

const subtitle = {
	width: "90%",
	height: "5%",
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: '2px',
    float: 'left',
    marginTop: '0px',
	marginLeft: '25px',
}

const logo = {
	color: '#fff',
	fontWeight: 'bold',
	textAlign: 'undefined',
	width: '10%',
	float: 'left',
	marginTop: '15px',
	marginLeft: '25px',
	letterSpacing: '4px'
}
const nav = {
	float: 'right',
	width: '50%',
	textAlign: 'right',
	marginRight: '25px'
}
const header_nav_ul = {
	listStyle: 'none',
	float: 'right'
}

const section = {
	width: '25%',
    height: "35%",
    textAlign: 'left',
    float: 'left',
    marginLeft: '4%'
}

const drop = {
	width: '20%',
    height: "35%",
    float: 'left',
    
}

const nav_ul_li = {
	float: 'left',
	color: '#FFFFFF',
	fontSize: '14px',
	textAlign: 'left',
	marginRight: '25px',
	letterSpacing: '2px',
	fontWeight: 'bold',
	transition: 'all 0.3s linear'
}
const ul_li_a = {
	color: '#FFFFFF',
	textDecoration: 'none'
}

const text = {
    textAlign: 'left',
    marginTop: '2%',
    marginLeft: '4%',
    marginRight: '50%'
}


const btnCancel = {
    width:"25%",
    height:"30px",
    fontWeight: 'bold',
    marginTop: '2%',
    marginRight: '5%',
    marginLeft: '2%'

}

const btnContinue = {
    width:"25%",
    height:"30px",
    fontWeight: 'bold',
    marginTop: '2%',
    marginLeft: '1%'
}

const section1 = {
    width:"80%",
    height:"270px",
    float:"center",
    backgroundColor:"#FFFFFF",
    padding:"10px",
    borderStyle: "dotted",
    marginTop: '1%',
    marginRight: '20%',
    marginLeft: '20%'
}

const drop1 = {
    width:"98%",
    height:"150px",
    float:"center",
    backgroundColor:"#eeeeee",
    borderStyle: "dotted",
}



class PageOne extends React.Component {
    // init data
    constructor(props) {
        super(props);

        this.onDrop1 = (files1) => {
            if (files1.length != 1){
                alert("More than one file, retry");
            }

            this.setState({files1})
        };

        this.onDrop2 = (files2) => {
            if (files2.length != 1){
                alert("More than one file, retry");
            }

            this.setState({files2})
        };

        this.onDrop3 = (files3) => {
            if (files3.length != 1){
                alert("More than one file, retry");
            }

            this.setState({files3})
        };

        this.state = {
            // data that will be used/changed in render function
            files1: [],
            files2: [],
            files3: []
        }
        // Every function that interfaces with UI and data used 
        // in this class needs to bind like this:
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.history.push('/')
    }



    render() {
        const files1 = this.state.files1.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));
        
          const files2 = this.state.files2.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));
          const files3 = this.state.files3.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));
          const useStyles = makeStyles((theme) => ({
            root: {
              '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
              },
            },
          }));



        return (
            <div style={container}>
                <div style={header}> 
                    <div>
                    <a href=""><h2 style={logo}>Planimation</h2></a>
                    <nav style={nav}>
                        <ul style={header_nav_ul}>
                            <li style={nav_ul_li}><a style={ul_li_a} href="#about">ABOUT</a></li>
                            <li style={nav_ul_li}><a style={ul_li_a} href="#contact" onClick={this.handleOnClick}>HOME</a></li>
                        </ul>
                    </nav>
                    </div>  
                </div> 
                <div style={header}>
                    <h3 style={subtitle}>Build Visualisation From Problem</h3>
                </div>

                <div>
                    <h3 style={text}>
                        Option 1 - Planner URL
                    </h3>
                </div>
                
                <form className={useStyles.root} noValidate autoComplete="off">
                    <div style={text}>
                        <TextField id="outlined-basic" label="URL" size='small' variant="outlined" style={{float: 'left', width: '90%', marginLeft: '45%'}}/>
                    </div>
                    <div style={{float: 'left', marginLeft: '1%', alignItems: 'center'}}>
                        <Button variant="contained" color="primary" size="medium">
                            Paste
                        </Button>
                    </div>
                </form>
           

                <div style={{marginTop:"5%"}}>
                    <h3 style={text}>
                        Option 2 - Upload Problem Domain and Animation Profile Files
                    </h3>
                </div>
                <div>
                    <div style={section}>
                        <h2>Domain File</h2>
                        <p>For predicates and actions</p>
                        <h2>Problem File</h2>
                        <p>For objects, initial state and goal</p>
                        <h2>Animation File</h2>
                        <p>Object is representation</p>
                    </div>
                    <div style={drop}>
                        <Dropzone onDrop={this.onDrop1} maxFiles={'1'}>
                        {({getRootProps, getInputProps}) => (
                            <section style={section1}>
                                <div {...getRootProps()} style={drop1} >
                                    <input {...getInputProps()} />
                                    <p>Drag and drop Domain.pddl here, or click to select file</p>
                                </div>
                                <aside>
                                    <h4>File:</h4>
                                    <ul>{files1}</ul>
                                </aside>
                            </section>
                        )}
                        </Dropzone>
                    </div>
                    <div style={drop}>
                        <Dropzone onDrop={this.onDrop2} maxFiles={'1'}>
                        {({getRootProps, getInputProps}) => (
                            <section style={section1}>
                                <div {...getRootProps()} style={drop1} >
                                    <input {...getInputProps()} />
                                    <p>Drag and drop Problem.pddl here, or click to select file</p>
                                </div>
                                <aside>
                                    <h4>File:</h4>
                                    <ul>{files2}</ul>
                                </aside>
                            </section>
                        )}
                        </Dropzone>
                    </div>
                    <div style={drop}>
                        <Dropzone onDrop={this.onDrop3} maxFiles={'1'}>
                        {({getRootProps, getInputProps}) => (
                            <section style={section1}>
                                <div {...getRootProps()} style={drop1} >
                                    <input {...getInputProps()} />
                                    <p>Drag and drop Animation.pddl here, or click to select file</p>
                                </div>
                                <aside>
                                    <h4>File:</h4>
                                    <ul>{files3}</ul>
                                </aside>
                            </section>
                        )}
                        </Dropzone>
                    </div>
                </div>
                <div>
                    <Button style={btnCancel} variant="contained" color="primary" size="medium"  onClick={this.handleOnClick}>
                    CANCEL
                    </Button>
                    <Button style={btnContinue} variant="contained" color="primary" size="medium"  onClick={this.handleOnClick}>
                    CONTINUE
                    </Button>
                </div>
            </div>
          );
    }
    
  }
  
  export default PageOne;

