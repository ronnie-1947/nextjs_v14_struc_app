import React from "react";
import { createSnippet } from "@/actions/snippets";
import SnippetEditForm from "@/components/snippet-edit-form";
import SnippetCreateForm from "@/components/snippet-create-form";

const SnippetsCreatePage = () => {

  return (
      <SnippetCreateForm/>
  );
};

export default SnippetsCreatePage;
