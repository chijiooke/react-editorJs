import { getRandomCharacters } from "../../utils/idGenerator";
import Shortcut from "@codexteam/shortcuts";

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
  constructor() {
    this.button = null;
    this.state = false;
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
      // If highlights is already applied, do nothing for now
      return;
    }

    const selectedText = range.extractContents();

    // Create MARK element
    const span = document.createElement("SPAN");
    span.className = "question__field";
    span.id = getRandomCharacters(9);

    // Append to the MARK element selected TextNode
    span.appendChild(selectedText);
    // console.log(`${span}`);

    // Insert new element
    range.insertNode(span);
    // range.insertNode('&nbsp');
  }

  checkState(selection: any) {
    const text = selection.anchorNode;

    if (!text) {
      return;
    }

    const anchorElement = text instanceof Element ? text : text.parentElement;
    // console.log(anchorElement?.innerHTML);
    // console.log(text);

    this.state = !!anchorElement.closest("SPAN");
  }

  save(data: any) {
    console.log(data);
    return { sss: "sss" };
  }
}
