import { BodyComponent } from 'mjml-core';
import { parseBorder } from '../helpers/border';
import { formatPrice, formatNumber } from '../helpers/format';

export default class MjPropertytriplebetter extends BodyComponent {
  static componentName = 'mj-propertytriple';
  static endingTag = false;

  borderRadius!: string;
  innerBorderRadius!: string;
  uniqueId!: string;

  constructor(initialDatas = {}) {
    super(initialDatas)
    this.borderRadius = this.getAttribute('border-radius');
    this.uniqueId = Math.random().toString(36).slice(2, 8);

    // Calculate inner border radius (outer radius minus stroke weight)
    const border = parseBorder(this.getAttribute('border'));
    const strokeWeight = border.width;
    const borderRadiusNum = parseInt(this.borderRadius, 10) || 0;
    this.innerBorderRadius = `${Math.max(0, borderRadiusNum - strokeWeight)}px`;
  }

  static dependencies = {
    'mj-column': ['mj-propertytriple'],
    'mj-propertytriple': [],
  };

  static allowedAttributes = {
    // Global
    'width': 'string',
    'card-width': 'string',
    'gap': 'string',
    'border-radius': 'string',
    'border': 'string',
    'image-height': 'string',
    'font-family': 'string',
    'text-color': 'string',
    'background-color': 'string',
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
    // Global
    'width': '100%',
    'card-width': '160px',
    'gap': '12px',
    'border-radius': '0px',
    'border': '1px solid #d1d1d5',
    'image-height': '102px',
    'font-family': "'Open Sans',Helvetica,Arial,sans-serif",
    'text-color': '#2a2a33',
    'background-color': 'transparent',
    // Card 1
    'image-src-1': 'https://cornerstonepropertymgmt.com/wp-content/themes/cornerstone/assets/img/nofeaturedimage.jpg',
    'href-1': '#',
    'price-1': '$0',
    'beds-1': '--',
    'baths-1': '--',
    'sqft-1': '--',
    'city-1': 'City',
    // Card 2
    'image-src-2': 'https://cornerstonepropertymgmt.com/wp-content/themes/cornerstone/assets/img/nofeaturedimage.jpg',
    'href-2': '#',
    'price-2': '$0',
    'beds-2': '--',
    'baths-2': '--',
    'sqft-2': '--',
    'city-2': 'City',
    // Card 3
    'image-src-3': 'https://cornerstonepropertymgmt.com/wp-content/themes/cornerstone/assets/img/nofeaturedimage.jpg',
    'href-3': '#',
    'price-3': '$0',
    'beds-3': '--',
    'baths-3': '--',
    'sqft-3': '--',
    'city-3': 'City',
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
      .property-triple-card-${this.uniqueId} {
        width: 100% !important;
        border-radius: ${this.borderRadius} !important;
      }
      .property-triple-spacer-${this.uniqueId} {
        
      }
      .property-triple-image-spacer-${this.uniqueId} {
        
      }
      .property-triple-spacer-top,
      .property-triple-spacer-bottom {
        display: none !important;
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
        width: 600px!important;
        height: 100% !important;
        border-radius: 0 ${this.innerBorderRadius} ${this.innerBorderRadius} 0 !important;
      }
      .property-triple-city-row-${this.uniqueId} {
        width: 135px !important;
      }
      .property-triple-section-column {
        width: 100% !important;
      }
    }
  `;

  renderCard(index: number) {
    const href = this.getAttribute(`href-${index}`);
    const price = formatPrice(this.getAttribute(`price-${index}`));
    const beds = formatNumber(this.getAttribute(`beds-${index}`));
    const baths = formatNumber(this.getAttribute(`baths-${index}`));
    const sqft = formatNumber(this.getAttribute(`sqft-${index}`));
    const city = this.getAttribute(`city-${index}`);
    const imageSrc = this.getAttribute(`image-src-${index}`);
    const borderRadius = this.getAttribute('border-radius');
    const imageHeight = this.getAttribute('image-height');
    const border = this.getAttribute('border');
    const fontFamily = this.getAttribute('font-family');
    const textColor = this.getAttribute('text-color');
    const backgroundColor = this.getAttribute('background-color');

    // Calculate inner border radius for image area
    const parsedBorder = parseBorder(border);
    const strokeWeight = parsedBorder.width;
    const borderRadiusNum = parseInt(borderRadius, 10) || 0;
    const innerBorderRadius = `${Math.max(0, borderRadiusNum - strokeWeight)}px`;

    return `
      <table class="property-triple-card-${this.uniqueId} property-triple-table" role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="width:100%; border:${border}; border-radius:${borderRadius}; border-collapse:separate;${backgroundColor !== 'transparent' ? ` background-color:${backgroundColor};` : ''}">
        <tbody>
          <tr class="property-triple-card-row-${this.uniqueId}">
            <td class="property-triple-image-${this.uniqueId}" align="center" background="${imageSrc}" style="background-repeat:no-repeat;background-position:center;background-size:cover;border-radius:${innerBorderRadius} ${innerBorderRadius} 0px 0px;background-color:#f1f1f4 ">
              <a style="text-decoration:none" href="${href}" target="_blank">
                <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="width:100% height:100%">
                  <tbody>
                    <tr>
                      <td class="property-triple-image-spacer-${this.uniqueId}" style="height:${imageHeight};width:100%" role="img" aria-label="Photo of a Property"></td>
                    </tr>
                  </tbody>
                </table>
              </a>
            </td>
          </tr>
          <tr class="property-triple-content-row-${this.uniqueId}">
            <td class="property-triple-content-${this.uniqueId}">
              <a href="${href}" style="text-decoration:none" target="_blank">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                    <tr>
                      <td align="left" valign="top" style="padding:4px 6px 8px 8px">
                        <strong style="display:block;font-family:${fontFamily};font-size:14px;line-height:24px;color:${textColor};font-weight:700">${price}</strong>
                        <p style="font-family:${fontFamily};font-size:12px;line-height:16px;font-weight:400;color:${textColor};font-style:normal;margin:0;padding:0 0 4px 0">
                          <b>${beds}</b>&nbsp;<abbr title="bedrooms" style="text-decoration:none">bd</abbr>
                          <span style="color:#d1d1d5">|</span>
                          <b>${baths}</b>&nbsp;<abbr title="bathrooms" style="text-decoration:none">ba</abbr>
                          <span style="color:#d1d1d5">|</span>
                          <b>${sqft}</b>&nbsp;<abbr title="square feet" style="text-decoration:none">sqft</abbr>
                        </p>
                        <p class="property-triple-city-row-${this.uniqueId}" style="width: 140px;font-family:${fontFamily};font-size:12px;line-height:16px;font-weight:400;color:${textColor};font-style:normal;margin:0;padding:0;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${city}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    `
  }

  render() {

    const width = this.getAttribute('width');
    const gap = this.getAttribute('gap');
    const backgroundColor = this.getAttribute('background-color');

    const card1 = this.renderCard(1);
    const card2 = this.renderCard(2);
    const card3 = this.renderCard(3);

    return this.renderMJML(`
      <mj-table  align="center" width="${width}" padding="0">
        <tr class="property-triple-row-${this.uniqueId}">
          <th class="property-triple-card-wrapper-${this.uniqueId}" valign="top" align="center" width="100px" ">  
            ${card1}
          </th>
          <th class="property-triple-spacer-${this.uniqueId}" style="font-size:0px;line-height:16px;font-weight:normal;width:4px; height:4px">&nbsp;</th>
          <th class="property-triple-card-wrapper-${this.uniqueId}" valign="top" align="center" width="100px" ">
              ${card2}
          </th>
          <th class="property-triple-spacer-${this.uniqueId}" style="font-size:0px;line-height:16px;font-weight:normal;width:4px; height:4px">&nbsp;</th>
          <th class="property-triple-card-wrapper-${this.uniqueId}" valign="top" align="center" width="100px" ">
              ${card3}
          </th>
        </tr>
      </mj-table>
    `)
  }
}