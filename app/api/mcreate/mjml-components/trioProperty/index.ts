import { BodyComponent } from 'mjml-core';
import {
  formatPrice,
  formatNumber,
  parseBorder,
} from '@kgalexander/mcreate-react';

/**
 * MJML server-side counterpart of the React `m-property-trio` component.
 *
 * Card data is flattened at the json2mjml boundary: each of the 3 children
 * (mj-propertytriple-item) contributes its attributes suffixed with `-1`, `-2`, `-3`
 * onto this single parent tag. The server component is emitted as a void tag.
 *
 * Output must stay in sync with src/react-components/m-property-trio/index.tsx and
 * src/react-components/m-property-trio/PropertyTrioItem.tsx.
 */
export default class MjPropertyTriple extends BodyComponent {
  static componentName = 'mj-propertytriple';
  static endingTag = true;

  static dependencies = {
    'mj-column': ['mj-propertytriple'],
    'mj-propertytriple': [],
  };

  borderRadius!: string;
  innerBorderRadius!: string;
  uniqueId!: string;

  constructor(initialDatas = {}) {
    super(initialDatas);
    const border = parseBorder(this.getAttribute('border'));
    this.borderRadius = this.getAttribute('border-radius');
    const borderRadiusNum = parseInt(this.borderRadius, 10) || 0;
    this.innerBorderRadius = `${Math.max(0, borderRadiusNum - border.width)}px`;
    this.uniqueId = Math.random().toString(36).slice(2, 8);
  }

  static allowedAttributes = {
    // Global
    'width': 'string',
    'card-width': 'string',
    'gap': 'string',
    'border-radius': 'string',
    'border': 'string',
    'padding': 'string',
    'image-height': 'string',
    'font-family': 'string',
    'text-color': 'color',
    'background-color': 'color',
    // Card 1
    'image-src-1': 'string',
    'href-1': 'string',
    'price-1': 'string',
    'beds-1': 'string',
    'baths-1': 'string',
    'sqft-1': 'string',
    'city-1': 'string',
    // Card 2
    'image-src-2': 'string',
    'href-2': 'string',
    'price-2': 'string',
    'beds-2': 'string',
    'baths-2': 'string',
    'sqft-2': 'string',
    'city-2': 'string',
    // Card 3
    'image-src-3': 'string',
    'href-3': 'string',
    'price-3': 'string',
    'beds-3': 'string',
    'baths-3': 'string',
    'sqft-3': 'string',
    'city-3': 'string',
  };

  static defaultAttributes = {
    'width': '100%',
    'card-width': '160px',
    'gap': '12px',
    'border-radius': '0px',
    'border': '1px solid #d1d1d5',
    'image-height': '102px',
    'font-family': "'Open Sans',Helvetica,Arial,sans-serif",
    'text-color': '#2a2a33',
    'background-color': 'transparent',
    'href-1': '#', 'beds-1': '--', 'baths-1': '--', 'sqft-1': '--',
    'href-2': '#', 'beds-2': '--', 'baths-2': '--', 'sqft-2': '--',
    'href-3': '#', 'beds-3': '--', 'baths-3': '--', 'sqft-3': '--',
  };

  componentHeadStyle = (breakpoint: number) => `
    @media only screen and (max-width:${breakpoint}) {
      .property-triple-row-${this.uniqueId} {
        display: block !important;
        padding: 0 !important;
      }
      .property-triple-card-wrapper-${this.uniqueId} {
        display: block !important;
        width: 100% !important;
      }
      .property-triple-spacer-${this.uniqueId} {
        display: block !important;
        width: 100% !important;
        font-size: 0 !important;
      }
      .property-triple-card-${this.uniqueId} {
        width: 100% !important;
        border-radius: ${this.borderRadius} !important;
      }
      .property-triple-card-row-${this.uniqueId},
      .property-triple-content-row-${this.uniqueId} {
        display: table-cell !important;
        vertical-align: top !important;
      }
      .property-triple-image-${this.uniqueId} {
        width: 600px !important;
        border-radius: ${this.innerBorderRadius} 0 0 ${this.innerBorderRadius} !important;
      }
      .property-triple-content-${this.uniqueId} {
        width: 600px !important;
        height: 100% !important;
        border-radius: 0 ${this.innerBorderRadius} ${this.innerBorderRadius} 0 !important;
      }
      .property-triple-city-row-${this.uniqueId} {
        width: 135px !important;
      }
    }
  `;

  renderCard(index: number): string {
    const rawImageSrc = this.getAttribute(`image-src-${index}`) || '';
    const href = this.getAttribute(`href-${index}`) || '#';
    const priceRaw = this.getAttribute(`price-${index}`) || '';
    const price = formatPrice(priceRaw);
    const beds = formatNumber(this.getAttribute(`beds-${index}`) || '--');
    const baths = formatNumber(this.getAttribute(`baths-${index}`) || '--');
    const sqft = formatNumber(this.getAttribute(`sqft-${index}`) || '--');
    const city = this.getAttribute(`city-${index}`) || '';

    const border = this.getAttribute('border');
    const borderRadius = this.borderRadius;
    const innerBorderRadius = this.innerBorderRadius;
    const imageHeight = this.getAttribute('image-height');
    const fontFamily = this.getAttribute('font-family');
    const textColor = this.getAttribute('text-color');
    const backgroundColor = this.getAttribute('background-color');
    const hasBg = backgroundColor && backgroundColor !== 'transparent';

    return `
      <table class="property-triple-card property-triple-card-${this.uniqueId}" role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:${border};border-radius:${borderRadius};border-collapse:separate;border-spacing:0;${hasBg ? `background-color:${backgroundColor};` : ''}">
        <tbody>
          <tr class="property-triple-card-row-${this.uniqueId}">
            <td class="property-triple-image-${this.uniqueId}" align="center" background="${rawImageSrc}" style="background-repeat:no-repeat;background-position:center;background-size:cover;background-color:#f1f1f4;border-radius:${innerBorderRadius} ${innerBorderRadius} 0 0;">
              <a href="${href}" target="_blank" rel="noreferrer" style="text-decoration:none;">
                <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="width:100%;height:100%;">
                  <tbody>
                    <tr>
                      <td class="property-triple-image-spacer-${this.uniqueId}" style="height:${imageHeight};width:100%;" role="img" aria-label="Photo of a Property"></td>
                    </tr>
                  </tbody>
                </table>
              </a>
            </td>
          </tr>
          <tr class="property-triple-content-row-${this.uniqueId}">
            <td class="property-triple-content-${this.uniqueId}">
              <a href="${href}" target="_blank" rel="noreferrer" style="text-decoration:none;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                    <tr>
                      <td align="left" valign="top" style="padding:4px 6px 8px 8px;">
                        <strong style="display:block;font-family:${fontFamily};font-size:14px;line-height:24px;color:${textColor};font-weight:700;">
                          ${price || '$--'}
                        </strong>
                        <p style="font-family:${fontFamily};font-size:12px;line-height:16px;font-weight:400;color:${textColor};font-style:normal;margin:0;padding:0 0 4px 0;">
                          <b>${beds}</b>&nbsp;<abbr title="bedrooms" style="text-decoration:none;">bd</abbr>
                          <span style="color:#d1d1d5;">|</span>
                          <b>${baths}</b>&nbsp;<abbr title="bathrooms" style="text-decoration:none;">ba</abbr>
                          <span style="color:#d1d1d5;">|</span>
                          <b>${sqft}</b>&nbsp;<abbr title="square feet" style="text-decoration:none;">sqft</abbr>
                        </p>
                        <p class="property-triple-city-row-${this.uniqueId}" style="width:140px;font-family:${fontFamily};font-size:12px;line-height:16px;font-weight:400;color:${textColor};font-style:normal;margin:0;padding:0;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                          ${city}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }

  render() {
    const width = this.getAttribute('width');
    const gap = this.getAttribute('gap');
    const padding = this.getAttribute('padding');
    const fontFamily = this.getAttribute('font-family');

    const tableAttrs = [
      `align="center"`,
      `width="${width}"`,
      `font-family="${fontFamily}"`,
      padding ? `padding="${padding}"` : `padding="0"`,
    ].filter(Boolean).join(' ');

    const spacerStyle = `font-size:0px;line-height:16px;font-weight:normal;width:${gap};height:${gap};`;

    return this.renderMJML(`
      <mj-table ${tableAttrs}>
        <tr class="property-triple-row-${this.uniqueId}">
          <th class="property-triple-card-wrapper-${this.uniqueId}" valign="top" align="center" style="vertical-align:top;">
            ${this.renderCard(1)}
          </th>
          <th class="property-triple-spacer-${this.uniqueId}" style="${spacerStyle}">&nbsp;</th>
          <th class="property-triple-card-wrapper-${this.uniqueId}" valign="top" align="center" style="vertical-align:top;">
            ${this.renderCard(2)}
          </th>
          <th class="property-triple-spacer-${this.uniqueId}" style="${spacerStyle}">&nbsp;</th>
          <th class="property-triple-card-wrapper-${this.uniqueId}" valign="top" align="center" style="vertical-align:top;">
            ${this.renderCard(3)}
          </th>
        </tr>
      </mj-table>
    `);
  }
}
