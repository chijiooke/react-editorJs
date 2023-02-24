import EditorJS, { LogLevels, OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { Box } from "@mui/system";
import { default as React, Dispatch, FC, useEffect, useRef } from "react";
import { SpanTool } from "./editor-tools/inline-tools/spanTag";

const EDITTOR_HOLDER_ID = "editorjs";

const Editor: FC<{
  editorData: OutputData | undefined;
  setEditorData: Dispatch<OutputData>;
}> = ({ editorData, setEditorData }) => {
  const ejInstance = useRef<any>(null);

  // This will run only once
  useEffect(() => {
    new SpanTool();
    return () => {
      if (!ejInstance.current) {
        initEditor();
      }
      ejInstance.current = null;
    };
  }, []);

  // class MyTool {
  //   // data:any
  //    api:any
  //   constructor({ apidata}){
  //     this.api = apidata;
     
  //   }
  
  //   isFirstBlock() {
  //     return this.api.blocks.getCurrentBlockIndex() === 0;
  //   }
  //   // ... other methods
  // }

  const [anchorEl, setAnchorEl] = React.useState<{ x: any; y: any } | null>(
    null
  );

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
        // editor.api.blocks.getCurrentBlockIndex()
        setEditorData(content);
      },
      autofocus: true,
      tools: {
        header: Header,
        span: SpanTool,
      },
    });
  };

  return (
    <React.Fragment>
      {!!anchorEl && (
        <Box
          sx={{
            position: "absolute",
            top: `${anchorEl?.y}px`,
            left: `${anchorEl?.x}px`,
            height: "200px",
            backgroundColor: "#fff",
            width: "200px",
            zIndex: "2000",
          }}
        ></Box>
      )}

      <div style={{ minWidth: "100%" }} id={EDITTOR_HOLDER_ID}>
        {" "}
      </div>
    </React.Fragment>
  );
};

export default Editor;
