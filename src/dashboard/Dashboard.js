import { html, css, LitElement } from 'lit-element';

export class Dashboard extends LitElement {
  static get styles() {
    return css`
      :host {
        margin: 0;
      }
    `;
  }

  static get properties() {
    return {};
  }

  render() {
    return html` <dashboard-overview></dashboard-overview> `;
  }
}
window.customElements.define('dash-board', Dashboard);
