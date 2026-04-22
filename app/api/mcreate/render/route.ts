import { NextRequest } from "next/server";

import { registerComponent } from "mjml-core";
import { registerDependencies } from 'mjml-validator';
import mjml2html from "mjml";

import MjSingleProperty from '../mjml-components/singleProperty';
import MjSingleTwoProperty from '../mjml-components/singleTwoProperty';
import MjPropertyTriple from '../mjml-components/trioProperty';
registerComponent(MjSingleProperty);
registerComponent(MjSingleTwoProperty);
registerComponent(MjPropertyTriple);
registerDependencies({
  'mj-column': ['mj-singleproperty', 'mj-singleproperty-two', 'mj-propertytriple'],
  'mj-singleproperty': [],
  'mj-singleproperty-two': [],
  'mj-propertytriple': [],
});

export async function POST(request: NextRequest) {
  try {
    console.log("Converting MJML to HTML");

    const { mjmlString } = await request.json();

    if (typeof mjmlString !== "string" || mjmlString.length === 0) {
      return Response.json(
        { error: "Invalid request: mjmlString required" },
        { status: 400 }
      );
    }

    const { html, errors } = (await (mjml2html as any)(mjmlString, {
      validationLevel: "soft",
      keepComments: false,
    })) as { html: string; errors: any[] };

    return Response.json({
      html,
      errors: (errors ?? []).map((err: any) => ({
        line: err.line,
        message: err.message,
        tagName: err.tagName,
        formattedMessage: err.formattedMessage,
      })),
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
