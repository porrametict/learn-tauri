import React, { useState, useEffect } from "react";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import Editor from "@monaco-editor/react";

import "./App.css";
const App = () => {
  const [content, setContent] = useState(`{"active":true}`);

  const handleSave = async () => {
    await writeTextFile("note.txt", content, {
      dir: BaseDirectory.Download,
    });
  };

  const handleKeyDown = (e: any) => {
    // Check for "Ctrl+S" shortcut (or "Cmd+S" on macOS)
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault(); // Prevent the default behavior (e.g., browser save page)
      handleSave();
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [content]); // Re-add the event listener if the content changes

  return (
    <div>
      <Editor
        height="90vh"
        defaultLanguage="json"
        defaultValue={content}
        onChange={(value, event) => {
          setContent(value || "");
        }}
      />
    </div>
  );
};

export default App;
