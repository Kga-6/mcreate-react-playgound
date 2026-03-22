import { NextRequest } from "next/server";

import mjml2html from "mjml";
import { registerComponent } from 'mjml-core';
import { registerDependencies } from 'mjml-validator';

import MjColproperty from './mjml-components/property-better';
import MjPropertysingletwo from './mjml-components/property-singletwo';
import MjPropertytriplebetter from './mjml-components/property-triple-better';

registerComponent(MjColproperty);
registerComponent(MjPropertysingletwo);
registerComponent(MjPropertytriplebetter);
registerDependencies({
  'mj-body': ['mj-colproperty', 'mj-propertysingletwo', 'mj-propertytriple'],
  'mj-section': ['mj-colproperty', 'mj-propertysingletwo', 'mj-propertytriple'],
  'mj-column': ['mj-colproperty', 'mj-propertysingletwo', 'mj-propertytriple'],
  'mj-colproperty': [],
  'mj-propertysingletwo': [],
  'mj-propertytriple': [],
});

export async function POST(request: NextRequest) {
  try {
    console.log('MJML compilation started');

    const { mjml } = await request.json();

    console.log('mjml', mjml);

    if (!mjml || typeof mjml !== 'string') {
      return Response.json(
        { error: 'Invalid request: mjml string required' },
        { status: 400 }
      );
    }

    // Compile MJML to HTML
    const { html, errors } = mjml2html(mjml, {
      validationLevel: 'soft', // 'strict' | 'soft' | 'skip'
      filePath: '.', // For relative path resolution if needed
      keepComments: false,
    });

    console.log('errors 123', errors);

    // MCREATE uses this error format to display errors, you must return it in this format
    const result = {
      html,
      errors: errors.map((err : any) => ({
        line: err.line,
        message: err.message,
        tagName: err.tagName,
        formattedMessage: err.formattedMessage,
      })),
    };

    return Response.json(result);
    
  } catch (error) {
    console.error('MJML compilation error:', error);
    return Response.json(
      {
        error: 'MJML compilation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint for health check
export async function GET() {
  return Response.json({
    status: 'ok',
    customComponents: ["mj-colproperty", "mj-propertysingletwo", "mj-propertytriplebetter"],
    message: 'MJML API is ready. POST mjml string to compile.',
  });
}