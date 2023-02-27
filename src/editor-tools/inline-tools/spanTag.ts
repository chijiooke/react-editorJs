import { getRandomCharacters } from "../../utils/idGenerator";
import Shortcut from "@codexteam/shortcuts";
import { OutputData } from "@editorjs/editorjs";
import EditorJS from "@editorjs/editorjs";

let shiftR = new Shortcut({
  name: "shift+Q",
  on: document.body,
  callback: function (event: any) {
    this.remove();
  },
});

export class SpanTool {
  static get isInline() {
    return true;
  }

  static get shortcut() {
    return "shift+Q";
  }

  public static title: string = "Set Question";

  button: HTMLButtonElement | null;
  state: boolean;
  data: OutputData | undefined;
  api: EditorJS | null;
  constructor({
    api,
    data,
  }: {
    api: any | null;
    data: OutputData | undefined;
  }) {
    this.button = null;
    this.state = false;
    this.data = data;
    this.api = api;
  }

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.textContent = "?";
    this.button.className = "ce-inline-tool";

    return this.button;
  }

  surround(range: any) {
    if (this.state) {
      return;
    }

    const selectedText = range.extractContents();

    const span = document.createElement("SPAN");
    span.className = "question__field";
    span.id = getRandomCharacters(9);
    span.setAttribute(
      "metaData",
      JSON.stringify({ title: "This Is Title", type: "type-data" })
    );
    console.log(span);
    // span.dataH = JSON.stringify({title:'This Is Title', type:'type-data'})
    // span.innerText = "testing bro";

    span.appendChild(selectedText);
    range.insertNode(span);
  }

  checkState(selection: any) {
    const text = selection.anchorNode;

    if (!text) {
      return;
    }

    if (!!this.api) {
      const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
      const block = this.api.blocks.getBlockByIndex(0);
      // console.log(this.data);
    }

    const anchorElement = text instanceof Element ? text : text.parentElement;
    this.state = !!anchorElement.closest("SPAN");
  }

  static get sanitize() {
    return {
      span: (e: any) => {
        // e.classList.remove("question__field");
        return { class: true, id: true, metaData: true };
      },
    };
  }
}
