import React, { useState } from "react";
import DropZone from "./dropZone";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import css from "./index.module.less";

/**
 * Three DropZones and Upload button to fetch pddl to server
 * @param {function} props onStore function to send file to pageFour
 * @param {function} props onClick function to go back to home
 * @param {string} props url argument to paas to backend
 * @returns
 */
export default function DropAndFetch({ onStore, onClick, newURL }) {
  const [dataFiles, setDataFiles] = useState({});

  const dragsAndDrops = [
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

  const componentWillUnmount = () => {
    setDataFiles = (state, callback) => {
      return;
    };
  };

  const uploadPDDL = async (files) => {
    const formData = new FormData();
    for (const name in files) {
      formData.append(name, files[name]);
    }
    try {
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
      onStore(txt);
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = () => {
    //Control check for files
    if (newURL.lenght > 1) {
      handleFileLoad("url", newURL);
    }
    if (
      "domain" in dataFiles &&
      "problem" in dataFiles &&
      "animation" in dataFiles
    ) {
      uploadPDDL(dataFiles);
    } else {
      console.log("Some files are missing");
      alert("Some files are missing");
    }
  };

  const handleFileLoad = (name, file) => {
    dataFiles[name.toLowerCase()] = file;
  };

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
              onFileLoad={handleFileLoad}
            />
          ))}
        </Container>
        <Container maxWidth="sm" component="main">
          <div className={css.buttonBox}>
            <Button
              variant="contained"
              color="default"
              onClick={() => onClick()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              onClick={handleSubmit}
            >
              Upload Files
            </Button>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}
