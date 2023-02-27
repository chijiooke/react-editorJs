import EditorJS, { LogLevels, OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { default as React, Dispatch, FC, MutableRefObject, useEffect, useRef } from "react";
import CustomText from "./editor-tools/block-tools/CustomText";
import { SpanTool } from "./editor-tools/inline-tools/spanTag";
import { FormDataType } from "./types/FormDataType";

const EDITTOR_HOLDER_ID = "editorjs";

const Editor: FC<{
  editorData: OutputData | undefined;
  setEditorData: Dispatch<OutputData>;
  formData: MutableRefObject<FormDataType | null>;
}> = ({ editorData, setEditorData, formData }) => {
  const ejInstance = useRef<any | null>(null);

  // This will run only once
  useEffect(() => {
    return () => {
      if (!ejInstance.current) {
        initEditor();
      }
      ejInstance.current = null;
    };
  }, []);

  if (ejInstance.current) {
    new SpanTool({
      api: ejInstance?.current?.api,
      data: ejInstance?.current?.saver.save(),
    });

    new CustomText({
      api: ejInstance?.current?.api,
      // data: ejInstance?.current?.saver.save(),
    });
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
        setEditorData(content);
      },
      autofocus: true,
      defaultBlock: "customText",
      tools: {
        header: Header,
        span: SpanTool,
        customText: {
          class: CustomText,
        
          config: {
            getFormData: () => formData,
          },
        },
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
