import { getRandomCharacters } from "../../utils/idGenerator";
import Shortcut from "@codexteam/shortcuts";
import { API, OutputData } from "@editorjs/editorjs";
import EditorJS from "@editorjs/editorjs";

let shiftR = new Shortcut({
  name: "shift+Q",
  on: document.body,
  callback: function (event: any) {
    this.remove();
  },
});

export default class CustomText {
  static get toolbox() {
    return {
      title: "Custom Text",
      icon: "",
    };
  }

  private config: any;
  private api: API;

  constructor({ config = null, api }: { config?: any; api: API }) {
    this.config = config;
    this.api = api;
  }

  render() {
    const inputArea = document.createElement("div");
    inputArea.style.width = "100%";
    inputArea.contentEditable = "true";
    return inputArea;
  }

  save(blockContent: OutputData) {
    const blockData = {
      blockContent,
      metaData: this.config.getFormData(),
    };

    // console.log("blocks", this.api.blocks);
    console.log("Block Content Data", blockData);
    return {
      blockData,
    };
  }
}
