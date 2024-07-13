import {
  Mark,
  mergeAttributes
} from "./chunk-UI7E3QZO.js";
import "./chunk-5WRI5ZAA.js";

// node_modules/.pnpm/@tiptap+extension-underline@2.4.0_@tiptap+core@2.4.0_@tiptap+pm@2.4.0_/node_modules/@tiptap/extension-underline/dist/index.js
var Underline = Mark.create({
  name: "underline",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "u"
      },
      {
        style: "text-decoration",
        consuming: false,
        getAttrs: (style) => style.includes("underline") ? {} : false
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["u", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setUnderline: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleUnderline: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetUnderline: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-U": () => this.editor.commands.toggleUnderline()
    };
  }
});
export {
  Underline,
  Underline as default
};
//# sourceMappingURL=@tiptap_extension-underline.js.map
