import React from "react";
import DropZone from "./dropZone";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import css from "./index.module.less";

const dragsAndDrops=[
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
];
class DropAndFetch extends React.Component {
  constructor(props) {
    super(props);
    this.datas = {};
  }

 

  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };

  uploadPDDL = async (files) => {
    const formData = new FormData();
    for (const name in files) {
      formData.append(name, files[name]);
    }
    const resp = await fetch(
      "https://planimation.planning.domains/upload/pddl",
      {
        //"http://127.0.0.1:8000/upload/pddl" On local server
        method: "POST", //DO NOT use headers
        body: formData, // Dataformat
      }
    );

    const data = await resp.json();
    const txt = JSON.stringify(data);
    this.props.onStore(txt);
  };

  handleSubmit = () => {
    //Control check for files
    if (
      "domain" in this.datas &&
      "problem" in this.datas &&
      "animation" in this.datas
    ) {
      this.uploadPDDL(this.datas);
    } else {
      console.log("Some files are missing");
      alert("Some files are missing");
    }
  };

  handleFileLoad = (name, file) => {
    this.datas[name.toLowerCase()] = file;
    console.log(this.datas);
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Container component="main" className={css.dropareaBox}>
            {dragsAndDrops.map((drag) => (
              <DropZone
                key={drag.name}
                name={drag.name}
                desc={drag.desc}
                fileType={drag.fileType}
                onFileLoad={this.handleFileLoad}
              />
            ))}
          </Container>
          <Container maxWidth="sm" component="main">
            <div className={css.buttonBox}>
              <Button
                variant="contained"
                color="default"
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
                Upload Files
              </Button>
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default DropAndFetch;
