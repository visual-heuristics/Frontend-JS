import React, { Component } from "react";
import DragAndDrop from "./dragAndDrop";
//import "./styles.css";

class DropAndFetch extends React.Component {
  constructor(props) {
    super(props);
    this.datas = {};
  }

  state = {
    dragsAndDrops: [
      { name: "domain", fileType: "*.pddl" },
      { name: "problem", fileType: "*.pddl" },
      { name: "animation", fileType: "*.pddl" },
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
        (response) => console.log(response) //resp = response.json()
      )
      .then(
        (success) => (resp = success) //console.log(success)
      )
      .catch((error) => console.log(error));
    return resp;
  };

  handleSubmit = () => {
    if (
      "domain" in this.datas &&
      "problem" in this.datas &&
      "animation" in this.datas
    ) {
      let resp = this.upload(this.datas).bind(this);
    } else {
      console.log("Some missing files");
    }
  };

  handleLoad = (name, file) => {
    this.datas[name] = file;
  };

  render() {
    return (
      <div>
        {this.state.dragsAndDrops.map((drag) => (
          <DragAndDrop name={drag.name} />
        ))}
        <input type="button" value="Submit" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default DropAndFetch;
