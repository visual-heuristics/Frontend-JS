import React, { Component } from "react";
import styles from "./styles.less";

class DragAndDrop extends React.Component {
  componentDidMount() {
    this.nv.addEventListener("dragover", (event) => {
      event.stopPropagation();
      event.preventDefault();
      // Style the drag-and-drop as a "copy file" operation.
      event.dataTransfer.dropEffect = "copy";
    });
    this.nv.addEventListener("drop", (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (event.dataTransfer.files[0].name.endsWith(".pddl")) {
        this.nv.textContent = event.dataTransfer.files[0].name;
        event.dataTransfer.files[0].text().then((result) => {
          this.props.onLoad(this.props.name, result);
        });
      } else {
        console.log("wrong file type");
        alert("Wrong file type");
      }
    });
  }

  render() {
    return (
      <div ref={(elem) => (this.nv = elem)} className={styles.drop_area}>
        {this.props.name}
      </div>
    );
  }
}

export default DragAndDrop;
