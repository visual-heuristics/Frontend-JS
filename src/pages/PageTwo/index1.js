import React from "react";
import Dropzone from 'react-dropzone';
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

const section = {
    width:"60%",
    height:"100%",
    float:"center",
    backgroundColor:"#FFFFFF",
    padding:"10px",
    borderStyle: "dotted",
    marginTop: '1%',
    marginRight: '20%',
    marginLeft: '20%'
}

const text = {
    marginTop: '5%',
}

const drop = {
    width:"98%",
    height:"150px",
    float:"center",
    backgroundColor:"#eeeeee",
    borderStyle: "dotted",
    marginRight: '1%',
    marginLeft: '1%'
}

const btnCancel = {
    width:"25%",
    height:"30px",
    fontWeight: 'bold',
    marginTop: '5%',
    marginRight: '5%',
    marginLeft: '2%'

}

const btnContinue = {
    width:"25%",
    height:"30px",
    fontWeight: 'bold',
    marginTop: '5%',
    marginLeft: '1%'
}
  

class PageTwo extends React.Component {
    // init data
    
    constructor(props) {
        
        super(props);

        this.onDrop = (files) => {
            if (files.length != 1){
                alert("More than one file, retry");
            }

            this.setState({files})
        };
        this.state = {
            // data that will be used/changed in render function
            files: []
        };
        // Every function that interfaces with UI and data used 
        // in this class needs to bind like this:
        this.handleOnClick = this.handleOnClick.bind(this);
    }



    handleOnClick() {
        this.props.history.push('/')
    }
    

    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));

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
                    <h3 style={subtitle}>Build Visualisation From Solution VFG</h3>
                </div>
                <div>
                    <div style={text}>
                        SELECT THE VFG FILE TO GENERATE VISUALISATION DIRECTLY.
                    </div>

                    <Dropzone onDrop={this.onDrop} maxFiles={'1'}>
                        {({getRootProps, getInputProps}) => (
                            <section style={section}>
                                <div {...getRootProps()} style={drop}>
                                    <input {...getInputProps()} />
                                    <p>Drag and drop VFG(.VFG) file here, or click to select file</p>
                                </div>
                                <aside>
                                    <h4>Files</h4>
                                    <ul>{files}</ul>
                                </aside>
                            </section>
                        )}
                    </Dropzone>
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
  
  export default PageTwo;
