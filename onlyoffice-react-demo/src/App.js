import React, { useState, useEffect, useRef } from "react";
import { DocumentEditor } from "@onlyoffice/document-editor-react";
import axios from "axios";
import DocumentMenuBar from "./components/Menubar/doc-menubar";
import { Button, Modal, Input, Select, Col, Row } from "antd";
import SectionsList from "./components/SectionsMenu";
import Reference from "./components/References";
var onDocumentReady = function (event) {
  console.log("Document is loaded");
  fixSize();
};

var fixSize = function () {
  var wrapEl = document.getElementsByClassName("form");
  if (wrapEl.length) {
    wrapEl[0].style.height = window.screen.availHeight + "px";
    window.scrollTo(0, -1);
    wrapEl[0].style.height = window.innerHeight + "px";
  }
};

var onLoadComponentError = function (errorCode, errorDescription) {
  switch (errorCode) {
    case -1: // Unknown error loading component
      console.log(errorDescription);
      break;

    case -2: // Error load DocsAPI from http://documentserver/
      console.log(errorDescription);
      break;

    case -3: // DocsAPI is not defined
      console.log(errorDescription);
      break;
  }
};

export default function App() {
  const [config, setConfig] = useState(null);
  const [sectionShown, setSectionShown] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // Replace 'your_backend_endpoint' with the actual endpoint from which you want to fetch the config
        const response = await axios.get(
          "http://localhost:8000/edit-data?filename=endsem_ML_regular_AK.docx&directUrl=false"
        );
        const parsedConfig = JSON.parse(response.data["cfg"]);
        console.log(parsedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error("Failed to fetch config from backend:", error);
      }
    };

    fetchConfig();

    const handleResize = () => fixSize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!config) {
    return <div>Loading...</div>;
  } else {
    console.log({ config });
    return (
      <>
        <div className="editor-container">
          <div className="editor-window">
            <div className="form">
              <DocumentEditor
                id="docxEditor"
                documentServerUrl="http://localhost:80/"
                config={config}
                events_onDocumentReady={onDocumentReady}
                onLoadComponentError={onLoadComponentError}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
