"use client";

import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { createSnippet } from "@/actions/snippets";
import { useFormState } from "react-dom";

function SnippetCreateForm() {
  const [code, setCode] = useState("// Add some code here 👇");
  const createSnippetAction = createSnippet.bind(null, code);

  const [formState, action] = useFormState(createSnippetAction, {
    message: "",
  });

  return (
    <>
      <form className="flex h-full flex-col" action={action}>
        <h3 className="font-bold m-3">Create a Snippet</h3>
        <div className="flex h-full flex-col gap-4">
          <div className="flex gap-4">
            <label htmlFor="title" className="w-12">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="flex flex-grow gap-4">
            <label className="w-12">Code</label>
            <Editor
              height='90%'
              width="100%"
              theme="vs-dark"
              defaultValue={code}
              defaultLanguage="javascript"
              options={{ minimap: false }}
              onChange={(value: string = "") => setCode(value)}
            />
          </div>
          {formState?.message && <div className="my-2 p-2 bg-red-200 border rounded border-red-400">{formState.message}</div>}
          <button type="submit" className="rounded p-2 bg-blue-200">
            Create
          </button>
        </div>
      </form>
    </>
  );
}

export default SnippetCreateForm;
