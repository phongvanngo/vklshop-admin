import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

export default function TextEditor({ label, register, name, setValue }) {
  const editor = useRef(null);
  //   const [content, setContent] = useState("");
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  return (
    <div className="mb-8">
      <span className="mb-2 flex flex-col font-extrabold">{label}</span>
      <JoditEditor
        ref={editor}
        //   value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => {
          setValue(newContent);
        }} // preferred to use only this option to update the content for performance reasons
        //   onChange={(newContent) => {}}
      />
    </div>
  );
}
