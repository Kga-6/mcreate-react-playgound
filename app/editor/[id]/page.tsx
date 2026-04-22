"use client";

import { Suspense, use } from 'react';

import { Editor } from "@kgalexander/mcreate-react";
import { ImageData, mockImagesData } from '@/data/fake/images';
import { continueConversation } from '@/app/actions/ai';

function Template({ id, initialImages }: { id: string, initialImages: ImageData[] }) {
  return ( <Editor 
    templateId={id} 
    images={initialImages} 
    generativeStream={continueConversation} 
    /> 
  )
}

export default function ({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = use(params);

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-muted-foreground">Loading editor...</p>
      </div>
    }>
      <Template id={id} initialImages={mockImagesData} />
    </Suspense>
  );
}