import React, { Component } from "react";
import DragAndDrop from "./dragAndDrop";

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
      <div>
        {this.state.dragsAndDrops.map((drag) => (
          <DragAndDrop
            key={drag.name}
            name={drag.name}
            type={drag.fileType}
            onLoad={this.handleLoad}
          />
        ))}
        <input type="button" value="Submit" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default DropAndFetch;
