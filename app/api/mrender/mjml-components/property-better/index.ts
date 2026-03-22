import { BodyComponent } from 'mjml-core';
import { parseBorder } from '../helpers/border';
import { formatPrice, formatNumber, formatOpenHouseDate, formatOpenHouseTime } from '../helpers/format';

export default class MjColproperty extends BodyComponent {
  static componentName = 'mj-colproperty';
  static endingTag = false;

  static dependencies = {
    'mj-column': ['mj-colproperty'],
    'mj-colproperty': [],
  };

  static allowedAttributes = {
    'image-src': 'string',
    'image-alt': 'string',
    'price': 'string',
    'address': 'string',
    'city': 'string',
    'country': 'string',
    'beds': 'string',
    'baths': 'string',
    'sqft': 'string',
    'href': 'string',
    'status': 'string',
    'status-color': 'color',
    'is-new': 'string',
    'brokerage': 'string',
    'mls-logo': 'string',
    'width': 'string',
    'border-radius': 'string',
    'description': 'string',
    'is-open-house': 'string',
    'open-house-date': 'string',
    'open-house-time': 'string',
    'border': 'string',
    'font-family': 'string',
    'text-color': 'color',
    'brokerage-text-color': 'color',
    'is-description': 'string',
    'is-brokerage': 'string',
    'is-status': 'string',
  };

  static defaultAttributes = {
    'image-src': 'https://cornerstonepropertymgmt.com/wp-content/themes/cornerstone/assets/img/nofeaturedimage.jpg',
    'image-alt': 'Photo of a Property',
    'price': '$0',
    'address': '123 Main Street',
    'city': 'City, ST 00000',
    'country': 'USA',
    'beds': '--',
    'baths': '--',
    'sqft': '--',
    'href': '#',
    'status': 'Empty',
    'status-color': '#B8B8B8',
    'is-new': '',
    'brokerage': '',
    'mls-logo': 'https://t4.ftcdn.net/jpg/06/71/92/37/360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg',
    'border-radius': '0px',
    'width': '100%',
    'description': '',
    'is-open-house': '',
    'open-house-date': '',
    'open-house-time': '',
    'border': '1px solid #d1d1d5',
    'font-family': 'Arial, sans-serif',
    'text-color': '#111116',
    'brokerage-text-color': '#111116',
    'is-description': '',
    'is-brokerage': '',
    'is-status': '',
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
    const price = formatPrice(this.getAttribute('price'));
    const address = this.getAttribute('address');
    const city = this.getAttribute('city');
    const beds = formatNumber(this.getAttribute('beds'));
    const baths = formatNumber(this.getAttribute('baths'));
    const sqft = formatNumber(this.getAttribute('sqft'));
    const description = this.getAttribute('description');
    const imageSrc = this.getAttribute('image-src');
    const imageAlt = this.getAttribute('image-alt');
    const status = this.getAttribute('status');
    const statusColor = this.getAttribute('status-color');
    const isNew = this.getAttribute('is-new');
    const brokerage = this.getAttribute('brokerage');
    const mlsLogo = this.getAttribute('mls-logo');
    const width = this.getAttribute('width');
    const borderRadius = this.getAttribute('border-radius');
    const isOpenHouse = this.getAttribute('is-open-house');
    // Format open house: "2025-03-25" → "3/25", "14:00-16:00" → "2pm-4pm"
    const rawDate = this.getAttribute('open-house-date');
    const rawTime = this.getAttribute('open-house-time');
    const openHouseDate = formatOpenHouseDate(rawDate);
    const [startTime, endTime] = rawTime ? rawTime.split('-') : ['', ''];
    const openHouseTime = startTime && endTime
      ? `${formatOpenHouseTime(startTime)}-${formatOpenHouseTime(endTime)}`
      : '';
    const fontFamily = this.getAttribute('font-family');
    const textColor = this.getAttribute('text-color');
    const brokerageTextColor = this.getAttribute('brokerage-text-color');
    const isDescription = this.getAttribute('is-description');
    const isBrokerage = this.getAttribute('is-brokerage');
    const isStatus = this.getAttribute('is-status');

    // Parse border: "3px solid #E97575" → { width: 3, style: 'solid', color: '#E97575' }
    const border = parseBorder(this.getAttribute('border'));
    const strokeWeight = border.width;  // e.g., 3

    // Calculate inner border radius (outer radius minus stroke weight)
    const borderRadiusNum = parseInt(borderRadius, 10) || 0;  // "12px" → 12
    const innerBorderRadius = `${Math.max(0, borderRadiusNum - strokeWeight)}px`;  // e.g., "9px"

    // Calculate dimensions
    const imageWidth = '100%';
    const mlsLogoWidth = "32px";

    // MLS Logo HTML
    const mlsLogoHtml = mlsLogo ? 
      `
        <tr>
          <td colspan="2" align="right" valign="bottom" style="height:${mlsLogoWidth};padding:0 4px 4px 0">
            <img src="${mlsLogo}" border="0" alt="MLS Logo" style="display:block;font-weight:700;font-size:14px;color:#0041d9;height:${mlsLogoWidth};width:${mlsLogoWidth};border-radius:4px" class="CToWUd" data-bit="iit" width="100%">
          </td>
        </tr>
      ` : '';

    // STATUS BADGE with NEW BADGE
    const statusBadge = 
      `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-left:8px">
          <tbody>
            <tr>
              ${isStatus ? `
              <td valign="top">
                <span class="property-status-badge" style="display:table;background-color:#fffffe;border-radius:${borderRadius};font-weight:700;font-size:12px;line-height:1.5em;letter-spacing:0.0012em;margin:0;padding:1px 0;"><i style="letter-spacing:3px">&nbsp;</i><span style="color:${statusColor};font-size:18px;line-height:1;vertical-align:-1px;">●</span>&nbsp;<span style="color:#111116;">${status}</span><i style="letter-spacing:5px">&nbsp;</i></span>
              </td>
              ` : ''}
              ${isNew ? 
                `
                  ${isStatus ? `<td width="4" style="font-size:0px;line-height:0px">&nbsp;</td>` : ''}
                  <td valign="top">
                    <span class="property-new-badge" style="display:table;background-color:#d03c0b;border-radius:${borderRadius};font-weight:700;font-size:12px;line-height:1.5em;letter-spacing:0.0012em;margin:0;padding:2px 0 1px 0"><i style="letter-spacing:5px">&nbsp;</i><span style="color:#ffffff">New</span><i style="letter-spacing:5px">&nbsp;</i></span>
                  </td>
                ` : ''}
            </tr>
          </tbody>
        </table>
      `;

    const openHouseHtml = isOpenHouse ? 
      `
        <tr>
          <td>
            <table>
              <tbody>
                <tr>
                  <td valign="top" align="right" style="padding:3px 4px 8px 0px;font-size:0">
                    <img src="https://www.clipartmax.com/png/small/2-21103_home-house-silhouette-icon-building-transparent-background-home-icon.png" border="0" alt="House Icon" width="16" style="display:block;font-weight:700;font-size:14px;color:#2a2a33" class="CToWUd" data-bit="iit">
                  </td>
                  <td valign="top" align="left" style="font-size:0; padding:0px 0px 0px 0px;">
                    <strong style="font-size:14px;line-height:24px;color:${textColor};margin:0;padding:0">
                      <abbr title="open house" style="text-decoration:none">Open:</abbr>
                      &nbsp;
                    </strong>
                  </td>
                  <td valign="top" align="left" style="font-size:0; padding:0px 0px 0px 0px;">
                    <span  style="white-space:nowrap; font-size:14px;line-height:24px;color:${textColor};margin:0;padding:0;display:inline-block; font-weight:500; text-decoration:none">
                      ${openHouseDate} ${openHouseTime}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      ` : '';

    // Brokerage HTML
    const brokerageHtml = brokerage ?
      `
        <tr>
          <td class="property-brokerage" style="padding: 0px 0px 8px 0px;  font-size: 10px; font-weight: 300; line-height: 1; text-align: left; color:${brokerageTextColor};">
            ${brokerage}
          </td>
        </tr>
      ` : '';

    // Description HTML (truncate to 200 chars for email client compatibility)
    const truncatedDescription = description && description.length > 200 ? description.slice(0, 200) + '...' : description;
    const descriptionHtml = description ?
      `
        <tr>
          <td style="padding: 0px 0px 0px 0px; font-weight: 400; font-size: 14px; line-height: 1.5; text-align: left; color: ${textColor}; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
            ${truncatedDescription}
          </td>
        </tr>
      ` : '';


    return this.renderMJML(`
      <mj-table width="${width}" font-family="${fontFamily}">
        <tr class="property-better-image-row">
          <td align="center" valign="top" background="${imageSrc}" style="background-repeat:no-repeat;background-position:center;background-size:cover;background-color:#eeeef0; border-radius:${innerBorderRadius} ${innerBorderRadius} 0 0;">
            <a href="${href}" style="text-decoration:none;display:block;border-radius:12px 12px 0 0" target="_blank">
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="width:${imageWidth}">
                <tbody>
                  <tr>
                    <td align="left" valign="top" height="40" style="height:40px;padding-top:8px;">
                      ${isStatus || isNew ? statusBadge : ''}
                    </td>
                    <td align="right" valign="top" height="40" style="height:40px;padding:6px 2px 0 0"></td>
                  </tr>
                  <tr>
                    <td class="property-image-spacer" colspan="2" role="img" aria-label="${imageAlt}"></td>
                  </tr>
                  ${false ? mlsLogoHtml : ''}
                </tbody>
              </table>
            </a>
          </td>
        </tr>

        <tr class="property-better-content-row">
          <td align="left">
            <a href="${href}" style="text-decoration:none;display:block; padding:12px 8px 12px 8px;" target="_blank">
              <table>
                <tbody>

                  <tr>
                    <td class="property-price" style="padding: 0px 0px 8px 0px; font-size: 20px; font-weight: 600; line-height: 1; text-align: left; color: ${textColor};">
                      ${price}
                    </td>
                  </tr>

                  <tr>
                    <td class="property-details" style="padding: 0px 0px 8px 0px; font-size: 14px; line-height: 1; text-align: left; color: ${textColor};">
                      <b>${beds}</b>&nbsp;<abbr title="bedrooms" style="text-decoration:none">bd</abbr>

                      <span class="property-details-separator" >|</span>

                      <b>${baths}</b>&nbsp;<abbr title="bathrooms" style="text-decoration:none">ba</abbr>

                      <span class="property-details-separator" >|</span>

                      <b>${sqft}</b>&nbsp;<abbr title="square feet" style="text-decoration:none">sqft</abbr>
                    </td>
                  </tr>

                  <tr>
                    <td class="property-address" style="padding: 0px 0px 8px 0px; font-size: 14px; line-height: 1; text-align: left; color: ${textColor};">
                      ${address}, ${city}
                    </td>
                  </tr>

                  ${openHouseHtml}

                  <tr>
                    <td>
                      <table>
                        <tbody>
                          ${isBrokerage ? brokerageHtml : ''}
                          ${isDescription ? descriptionHtml : ''}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </a>
          </td>
        </tr>
      </mj-table>
    `);
  }
}