import { html, fixture, expect } from '@open-wc/testing';

import '../src/LoanBasicDetails/BasicDetails.js';

describe('Basic details', () => {
  it('Trail and error test case', async () => {
    const el = await fixture(html`<basic-details></basic-details>`);
    const inputElement = el.shadowRoot.querySelector('lion-input');

    expect(inputElement.type).to.equal('text');
    // expect(el.shadowRoot.querySelector('lion-input').ad).to.equal('Loan Details');
  });
});

/* describe('Test captureDetails', () => {
  it('calls myFunction when a button is clicked', () => {
    const el = fixture(
      html`
        <basic-details
          ><lion-form><form></form></lion-form
        ></basic-details>
      `
    );
    const myFunctionStub = stub(el, '_toCustomer');
    // const formEl = el.dom.querySelector('form');

    el.shadowRoot.querySelector('button').click();
    // el.submit(myFunctionStub);
    expect(myFunctionStub).to.have.callCount(1);
  });
});
 */
