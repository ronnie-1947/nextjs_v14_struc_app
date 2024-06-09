"use client";

import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error }: Props) {
  return (
    <>
      <div>{error.message}</div>
    </>
  );
}
