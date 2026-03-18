"use client";

import { Suspense, use } from 'react';

import { Editor } from "@kgalexander/mcreate-react";

function Template({ id }: { id: string }) {
  return ( <Editor templateId={id} /> )
}

export default function ({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = use(params);

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-muted-foreground">Loading editor...</p>
      </div>
    }>
      <Template id={id} />
    </Suspense>
  );
}