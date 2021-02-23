import { html, css, LitElement } from 'lit-element';
import { Router } from '@vaadin/router';

import '../header/Header.js';
import './Dashboard-overview.js';
import '../LoanBasicDetails/BasicDetails.js';
import '../Customer/Customer-details.js';
import '../LoanEMIDetails/LoanEMIDetails.js';
import '../SuccessAndError/Success.js';
import '../SuccessAndError/Error.js';

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
    return html`
      <loan-header></loan-header>
      <div id="outlet"></div>
    `;
  }

  firstUpdated() {
    this.getOverview();
  }

  getOverview() {
    const outlet = this.shadowRoot.getElementById('outlet');
    const router = new Router(outlet);
    router.setRoutes([
      { path: '/', component: 'dashboard-overview' },
      { path: '/details', component: 'basic-details' },
      { path: '/customer', component: 'customer-details' },
      { path: '/emidetails', component: 'loanemi-details' },
      { path: '/success', component: 'loan-success' },
      { path: '/error', component: 'loan-error' },
    ]);
  }
}
window.customElements.define('dash-board', Dashboard);
