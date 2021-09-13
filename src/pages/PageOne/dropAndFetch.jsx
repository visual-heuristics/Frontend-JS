import React, { Component } from "react";
//import DragAndDrop from "./dragAndDrop";
import DropZone from "./dropZone";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const btnCancel = {
  width: "25%",
  height: "30px",
  fontWeight: "bold",
  marginTop: "2%",
  marginRight: "5%",
  marginLeft: "2%",
};

const btnContinue = {
  width: "25%",
  height: "30px",
  fontWeight: "bold",
  marginTop: "2%",
  marginLeft: "1%",
};

const section = {
  width: "25%",
  height: "35%",
  textAlign: "left",
  float: "left",
  marginLeft: "4%",
};

class DropAndFetch extends React.Component {
  constructor(props) {
    super(props);
    this.datas = {};
  }

  state = {
    dragsAndDrops: [
      { name: "domain", fileType: ".pddl" },
      { name: "problem", fileType: ".pddl" },
      { name: "animation", fileType: ".pddl" },
    ],
  };

  uploadPDDL = (files) => {
    const formData = new FormData();
    for (const name in files) {
      formData.append(name, files[name]);
    }
    let resp;

    fetch("https://planimation.planning.domains/upload/pddl", {
      //"http://127.0.0.1:8000/upload/pddl", {
      method: "POST", //DO NOT use headers
      body: formData, // Dataformat
    })
      .then(
        (response) => console.log(response) //read response code and replicate
      )
      .then(
        (success) => (resp = success) //success contains the VFG
      )
      .catch((error) => console.log(error));
    return resp;
  };

  handleSubmit = () => {
    //Control check for files
    if (
      "domain" in this.datas &&
      "problem" in this.datas &&
      "animation" in this.datas
    ) {
      let resp = this.uploadPDDL(this.datas);
      console.log(resp);
    } else {
      console.log("Some files are missing");
      alert("Some files are missing");
    }
  };

  handleLoad = (name, file) => {
    this.datas[name] = file;
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <div style={section}>
            <h2>Domain File</h2>
            <p>For predicates and actions</p>
            <h2>Problem File</h2>
            <p>For objects, initial state and goal</p>
            <h2>Animation File</h2>
            <p>Object is representation</p>
          </div>

          {this.state.dragsAndDrops.map((drag) => (
            <DropZone
              key={drag.name}
              name={drag.name}
              fileType={drag.fileType}
              onLoad={this.handleLoad}
            />
          ))}
        </div>

        <div>
          <Button
            style={btnCancel}
            variant="contained"
            color="primary"
            size="medium"
            onClick={() => this.props.onClick()}
          >
            CANCEL
          </Button>
          <Button
            style={btnContinue}
            variant="contained"
            color="primary"
            size="medium"
            onClick={this.handleSubmit}
          >
            CONTINUE
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default DropAndFetch;
