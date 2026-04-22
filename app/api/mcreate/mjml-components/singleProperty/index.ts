import { BodyComponent } from 'mjml-core';
import {
  formatPrice,
  formatNumber,
  formatOpenHouseDate,
  formatOpenHouseTime,
  sortOpenHouseSlots,
  parseBorder,
} from '@kgalexander/mcreate-react';

/**
 * MJML server-side counterpart of the React `m-singleproperty` component.
 * Output must stay in sync with src/react-components/m-singleproperty/index.tsx.
 */
export default class MjSingleProperty extends BodyComponent {
  static componentName = 'mj-singleproperty';
  static endingTag = false;

  static dependencies = {
    'mj-column': ['mj-singleproperty'],
    'mj-singleproperty': [],
  };

  static allowedAttributes = {
    'image-src': 'string',
    'image-alt': 'string',
    'price': 'string',
    'address': 'string',
    'address2': 'string',
    'city': 'string',
    'state': 'string',
    'zip': 'string',
    'country': 'string',
    'beds': 'string',
    'baths': 'string',
    'sqft': 'string',
    'href': 'string',
    'status': 'string',
    'status-color': 'color',
    'new-label': 'string',
    'new-color': 'color',
    'brokerage': 'string',
    'mls-logo': 'string',
    'width': 'string',
    'border-radius': 'string',
    'padding': 'string',
    'description': 'string',
    'open-house-date': 'string',
    'open-house-time': 'string',
    'open-house-two-date': 'string',
    'open-house-two-time': 'string',
    'border': 'string',
    'background-color': 'color',
    'font-family': 'string',
    'text-color': 'color',
    'brokerage-text-color': 'color',
  };

  static defaultAttributes = {
    'image-src': 'https://mzyngaqmbvhpgmmipndy.supabase.co/storage/v1/object/public/Maillow/placeholder_image.png',
    'image-alt': 'Photo of a Property',
    'href': '#',
    'address': '123 Main Street',
    'city': 'City',
    'state': 'ST',
    'zip': '00000',
    'beds': '--',
    'baths': '--',
    'sqft': '--',
    'status': '',
    'status-color': '#B8B8B8',
    'new-color': '#B8B8B8',
    'mls-logo': 'https://t4.ftcdn.net/jpg/06/71/92/37/360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg',
    'border-radius': '0px',
    'width': '100%',
    'border': '1px solid #d1d1d5',
    'background-color': '#ffffff',
    'font-family': 'Arial, sans-serif',
    'text-color': '#111116',
    'brokerage-text-color': '#111116',
  };

  componentHeadStyle = (breakpoint: number) => `
    @media only screen and (max-width:${breakpoint}) {
      .property-better-image-row,
      .property-better-content-row {
        width: 100% !important;
      }
    }
  `;

  render() {
    const href = this.getAttribute('href');
    const rawPrice = this.getAttribute('price') ?? '';
    const price = formatPrice(rawPrice);

    const address = this.getAttribute('address') || '123 Main Street';
    const address2 = this.getAttribute('address2') ?? '';
    const city = this.getAttribute('city') || 'City';
    const stateVal = this.getAttribute('state') || 'ST';
    const zip = this.getAttribute('zip') || '00000';

    const beds = formatNumber(this.getAttribute('beds') || '--');
    const baths = formatNumber(this.getAttribute('baths') || '--');
    const sqft = formatNumber(this.getAttribute('sqft') || '--');

    const description = this.getAttribute('description') ?? '';
    const imageSrc = this.getAttribute('image-src');
    const imageAlt = this.getAttribute('image-alt');

    const status = this.getAttribute('status') ?? '';
    const statusColor = this.getAttribute('status-color');
    const newLabel = this.getAttribute('new-label') ?? '';
    const newColor = this.getAttribute('new-color');

    const brokerage = this.getAttribute('brokerage') ?? '';
    const width = this.getAttribute('width');
    const borderRadius = this.getAttribute('border-radius');
    const backgroundColor = this.getAttribute('background-color');
    const fontFamily = this.getAttribute('font-family');
    const textColor = this.getAttribute('text-color');
    const brokerageTextColor = this.getAttribute('brokerage-text-color');
    const padding = this.getAttribute('padding');
    const borderAttr = this.getAttribute('border');

    const rawDate = this.getAttribute('open-house-date') ?? '';
    const rawTime = this.getAttribute('open-house-time') ?? '';
    const rawDateTwo = this.getAttribute('open-house-two-date') ?? '';
    const rawTimeTwo = this.getAttribute('open-house-two-time') ?? '';

    const [sorted1, sorted2] = sortOpenHouseSlots(
      { date: rawDate, time: rawTime },
      { date: rawDateTwo, time: rawTimeTwo }
    );

    const openHouseDate = formatOpenHouseDate(sorted1.date);
    const [startTime, endTime] = sorted1.time ? sorted1.time.split('-') : ['', ''];
    const openHouseTime = startTime && endTime
      ? `${formatOpenHouseTime(startTime)}-${formatOpenHouseTime(endTime)}`
      : '';

    const openHouseDateTwo = formatOpenHouseDate(sorted2.date);
    const [startTimeTwo, endTimeTwo] = sorted2.time ? sorted2.time.split('-') : ['', ''];
    const openHouseTimeTwo = startTimeTwo && endTimeTwo
      ? `${formatOpenHouseTime(startTimeTwo)}-${formatOpenHouseTime(endTimeTwo)}`
      : '';

    // Inner border radius so inner content tracks the outer rounded corners minus the stroke
    const parsed = parseBorder(borderAttr);
    const strokeWeight = parsed.width;
    const borderRadiusNum = parseInt(borderRadius, 10) || 0;
    const innerBorderRadius = `${Math.max(0, borderRadiusNum - strokeWeight)}px`;

    const truncatedDescription = description.length > 200
      ? description.slice(0, 200) + '...'
      : description;
    const truncatedBrokerage = brokerage.length > 60
      ? brokerage.slice(0, 60) + '...'
      : brokerage;

    const addressLine = [
      [address, address2].filter(Boolean).join(', '),
      city,
      [stateVal, zip].filter(Boolean).join(' '),
    ].filter(Boolean).join(', ');

    const hasStatus = status.length > 0;
    const hasNew = newLabel.length > 0;

    const statusBadge = (hasStatus || hasNew) ? `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-left:8px;">
        <tbody>
          <tr>
            ${hasStatus ? `
              <td valign="top">
                <span class="property-status-badge" style="display:table;background-color:#fffffe;border-radius:${borderRadius};font-weight:700;line-height:1.5em;letter-spacing:0.0012em;margin:0;padding:1px 0;">
                  <i style="letter-spacing:3px;">&nbsp;</i><span style="color:${statusColor};font-size:18px;line-height:1;vertical-align:-1px;">●</span>&nbsp;<span style="color:#111116;">${status}</span><i style="letter-spacing:5px;">&nbsp;</i>
                </span>
              </td>
            ` : ''}
            ${hasNew ? `
              ${hasStatus ? `<td width="4" style="font-size:0px;line-height:0px;">&nbsp;</td>` : ''}
              <td valign="top">
                <span class="property-new-badge" style="display:table;background-color:${newColor};border-radius:${borderRadius};font-weight:700;font-size:12px;line-height:1.5em;letter-spacing:0.0012em;margin:0;padding:2px 0 1px 0;">
                  <i style="letter-spacing:5px;">&nbsp;</i><span style="color:#ffffff;">${newLabel}</span><i style="letter-spacing:5px;">&nbsp;</i>
                </span>
              </td>
            ` : ''}
          </tr>
        </tbody>
      </table>
    ` : '';

    const hasOpenHouse = (openHouseDate && openHouseTime) || (openHouseDateTwo && openHouseTimeTwo);
    const openHouseText =
      (openHouseDate && openHouseTime ? `${openHouseDate} ${openHouseTime.toUpperCase()}` : '') +
      (openHouseDateTwo && openHouseTimeTwo ? `, ${openHouseDateTwo} ${openHouseTimeTwo.toUpperCase()}` : '');

    const openHouseHtml = hasOpenHouse ? `
      <tr>
        <td>
          <table>
            <tbody>
              <tr>
                <td valign="top" align="right" style="padding:3px 4px 8px 0px;font-size:0;">
                  <p style="font-size:14px;margin:0;">🏠</p>
                </td>
                <td valign="top" align="left" style="font-size:0;padding:0;">
                  <strong class="property-open-house-text" style="line-height:24px;color:${textColor};margin:0;padding:0;">
                    <abbr title="open house" style="text-decoration:none;">Open:</abbr>&nbsp;
                  </strong>
                </td>
                <td valign="top" align="left" style="font-size:0;padding:0;">
                  <span class="property-open-house-text" style="white-space:nowrap;line-height:24px;color:${textColor};margin:0;padding:0;display:inline-block;font-weight:500;text-decoration:none;">
                    ${openHouseText}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    ` : '';

    const brokerageHtml = brokerage.length > 0 ? `
      <tr>
        <td class="property-brokerage" style="padding:0 0 8px 0;font-size:10px;font-weight:300;line-height:1.5em;text-align:left;color:${brokerageTextColor};display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;">
          ${truncatedBrokerage}
        </td>
      </tr>
    ` : '';

    const descriptionHtml = description.length > 0 ? `
      <tr>
        <td class="property-description" style="padding:0;font-weight:400;line-height:1.5;text-align:left;color:${textColor};display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;">
          ${truncatedDescription}
        </td>
      </tr>
    ` : '';

    const tableAttrs = [
      `width="${width}"`,
      `font-family="${fontFamily}"`,
      padding ? `padding="${padding}"` : '',
    ].filter(Boolean).join(' ');

    return this.renderMJML(`
      <mj-table ${tableAttrs}>
        <tr class="property-better-image-row">
          <td align="center" valign="top" style="padding:0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" background="${imageSrc}" style="width:100%;border-collapse:separate;border-spacing:0;background-repeat:no-repeat;background-position:center;background-size:cover;background-color:#eeeef0;border:${borderAttr};border-radius:${innerBorderRadius} ${innerBorderRadius} 0 0;">
              <tbody>
                <tr>
                  <td>
                    <a href="${href}" target="_blank" rel="noreferrer" style="text-decoration:none;display:block;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                        <tbody>
                          <tr>
                            <td align="left" valign="top" style="height:40px;padding-top:8px;">
                              ${statusBadge}
                            </td>
                            <td align="right" valign="top" style="height:40px;padding:6px 2px 0 0;"></td>
                          </tr>
                          <tr>
                            <td class="property-image-spacer" colspan="2" role="img" aria-label="${imageAlt}"></td>
                          </tr>
                        </tbody>
                      </table>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr class="property-better-content-row">
          <td align="left" style="padding:0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:separate;border-spacing:0;border-left:${borderAttr};border-right:${borderAttr};border-bottom:${borderAttr};border-radius:0 0 ${innerBorderRadius} ${innerBorderRadius};background-color:${backgroundColor};">
              <tbody>
                <tr>
                  <td>
                    <a href="${href}" target="_blank" rel="noreferrer" style="text-decoration:none;display:block;padding:12px 8px 12px 8px;">
                      <table>
                        <tbody>
                          <tr>
                            <td class="property-price" style="padding:0 0 8px 0;font-weight:600;line-height:1.2em;text-align:left;color:${textColor};">
                              ${price || '$--'}
                            </td>
                          </tr>
                          <tr>
                            <td class="property-details" style="padding:0 0 8px 0;line-height:1.5em;text-align:left;color:${textColor};">
                              <b>${beds}</b>&nbsp;<abbr title="bedrooms" style="text-decoration:none;">bd</abbr>
                              <span class="property-details-separator">|</span>
                              <b>${baths}</b>&nbsp;<abbr title="bathrooms" style="text-decoration:none;">ba</abbr>
                              <span class="property-details-separator">|</span>
                              <b>${sqft}</b>&nbsp;<abbr title="square feet" style="text-decoration:none;">sqft</abbr>
                            </td>
                          </tr>
                          <tr>
                            <td class="property-address" style="padding:0;line-height:1.5em;text-align:left;color:${textColor};">
                              ${addressLine}
                            </td>
                          </tr>
                          ${openHouseHtml}
                          <tr>
                            <td>
                              <table>
                                <tbody>
                                  ${brokerageHtml}
                                  ${descriptionHtml}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </mj-table>
    `);
  }
}
