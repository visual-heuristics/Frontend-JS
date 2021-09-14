import React from "react";
import DropZone from "./dropZone";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import css from "./index.module.less";

class DropAndFetch extends React.Component {
  constructor(props) {
    super(props);
    this.datas = {};
  }

  state = {
    dragsAndDrops: [
      { name: "Domain", fileType: ".pddl", desc: "or predictes and actions." },
      {
        name: "Problem",
        fileType: ".pddl",
        desc: "for objects, initial state and goal.",
      },
      {
        name: "Animation",
        fileType: ".pddl",
        desc: "object is representation.",
      },
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

  handleFileLoad = (name, file) => {
    this.datas[name] = file;
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Container component="main" className={css.dropareaBox}>
            {this.state.dragsAndDrops.map((drag) => (
              <DropZone
                key={drag.name}
                name={drag.name}
                desc={drag.desc}
                fileType={drag.fileType}
                onFileLoad={this.handleFileLoad}
              />
            ))}
          </Container>
          <Container maxWidth="sm" component="main" marginTop="50">
            <div className={css.buttonBox}>
              <Button
                variant="contained"
                color="#224878"
                onClick={() => this.props.onClick()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
                onClick={this.handleSubmit}
              >
                Upload File
              </Button>
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default DropAndFetch;
