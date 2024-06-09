"use client";

import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { editSnippit } from "@/actions/snippets";

interface Props {
  snippet: Snippet;
}

function SnippetEditForm({ snippet }: Props) {
  const [code, setCode] = useState("");

  const editSnippitAction = editSnippit.bind(null, snippet.id, code);

  return (
    <>
      <form action={editSnippitAction}>
        <Editor
          height="90vh"
          theme="vs-dark"
          defaultValue={snippet?.code}
          defaultLanguage="javascript"
          options={{ minimap: false }}
          onChange={(value: string = "") => setCode(value)}
        />
        <button type="submit" className="border my-2 py-2 px-4 rounded">Save</button>
      </form>
    </>
  );
}

export default SnippetEditForm;
