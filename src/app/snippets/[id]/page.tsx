import { deleteSnippet } from "@/actions/snippets";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface SnippetProps {
  params: {
    id: string;
  };
}

const ShowSnippetsPage = async (props: SnippetProps) => {
  const snippetId = parseInt(props.params?.id);
  if (!snippetId) return notFound();

  const snippet = await db.snippet.findFirst({
    where: { id: snippetId },
  });

  if (!snippet) return notFound();
  
  const deleteSnippetAction = deleteSnippet.bind(null, snippet?.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default ShowSnippetsPage;
