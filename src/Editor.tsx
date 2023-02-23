import EditorJS, { LogLevels, OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { default as React, Dispatch, FC, useEffect, useRef } from "react";
import imageIcon from "./assets/Img";

const EDITTOR_HOLDER_ID = "editorjs";

const Editor: FC<{
  editorData: OutputData | undefined;
  setEditorData: Dispatch<OutputData>;
}> = ({ editorData, setEditorData }) => {
  const ejInstance = useRef<any>(null);

  // This will run only once
  useEffect(() => {
    new SimpleImage();
    return () => {
      if (!ejInstance.current) {
        initEditor();
      }
      ejInstance.current = null;
    };
  }, []);

  class SimpleImage {
    static get toolbox() {
      return {
        title: "Image",
        icon: `${imageIcon}`,
      };
    }

    render() {
      const imageInput = document.createElement("input");
      imageInput.type = "file";
      return imageInput;
    }

    save(blockContent: any) {
      return {
        url: blockContent.value,
      };
    }
  }

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: "ERROR" as LogLevels,
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },

      onChange: async (e, event) => {
        let content = await editor.saver.save();
        console.log(this);
        setEditorData(content);
      },
      autofocus: true,
      tools: {
        header: Header,
        image: SimpleImage,
      },
    });
  };

  return (
    <React.Fragment>
      <div style={{ minWidth: "100%" }} id={EDITTOR_HOLDER_ID}>
        {" "}
      </div>
    </React.Fragment>
  );
};

export default Editor;
