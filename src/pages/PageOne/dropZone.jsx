import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const drop = {
  width: "20%",
  height: "35%",
  float: "left",
};

const section1 = {
  width: "80%",
  height: "270px",
  float: "center",
  backgroundColor: "#FFFFFF",
  padding: "10px",
  borderStyle: "dotted",
  marginTop: "1%",
  marginRight: "20%",
  marginLeft: "20%",
};

const drop1 = {
  width: "98%",
  height: "150px",
  float: "center",
  backgroundColor: "#eeeeee",
  borderStyle: "dotted",
};

class DropZone extends React.Component {
  onDrop = (file) => {
    if (file.length != 1) {
      alert("More than one file, retry");
    }
    if (file.name.endsWith(this.props.fileType)) {
      this.props.onLoad(this.props.name, file);
    } else {
      console.log("wrong file type");
      alert("Wrong file type");
    }
  };

  render() {
    return (
      <div style={drop}>
        <Dropzone onDrop={this.onDrop} maxFiles={"1"}>
          {({ getRootProps, getInputProps }) => (
            <section style={section1}>
              <div {...getRootProps()} style={drop1}>
                <input {...getInputProps()} />
                <p>
                  Drag and drop {this.props.name + this.props.fileType} here, or
                  click to select file
                </p>
              </div>
              <aside>
                <h4>File:</h4>
                <ul>
                  <li key={file.name}>
                    {file.name} - {file.size} bytes
                  </li>
                </ul>
              </aside>
            </section>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default DropZone;
