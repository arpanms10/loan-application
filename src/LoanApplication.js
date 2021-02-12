import { html, css, LitElement } from 'lit-element';
import { Router } from '@vaadin/router';
import './header/Header.js';
import './dashboard/Dashboard.js';
import './LoanBasicDetails/BasicDetails.js';

export class LoanApplication extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0px;
        color: var(--loan-application-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
    };
  }

  firstUpdated() {
    this.getOverview();
  }

  getOverview() {
    const outlet = this.shadowRoot.getElementById('outlet');
    const router = new Router(outlet);
    router.setRoutes([
      { path: '/dashBoard', component: 'dash-board' },
      { path: '/details', component: 'basic-details' },
    ]);
  }

  render() {
    return html`
      <div>
        <loan-header></loan-header>
        <div id="outlet"></div>
      </div>
    `;
  }
}
