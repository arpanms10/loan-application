/* eslint-disable no-return-assign */
// eslint-disable-next-line prefer-arrow-callback
// eslint-disable-next-line no-var
import { html, fixture, expect } from '@open-wc/testing';
// import { stub } from 'sinon';

import '../src/LoanEMIDetails/LoanEMIDetails.js';

/* beforeEach(() => {
  let store = {};

  spyOn(localStorage, 'getItem').andCallFake((key) => store[key]);

  spyOn(localStorage, 'setItem').andCallFake((key, value) => (store[key] = `${value  }`));
  spyOn(localStorage, 'clear').andCallFake(() => {
    store = {};
  });
}); */

describe('Loan EMI details', () => {
  it('Check elements', async () => {
    const data = { interestRate: 5 };
    localStorage.setItem('emi', JSON.stringify(data));
    const emiData = JSON.parse(localStorage.getItem('emi'));
    const el = await fixture(
      html`<loanemi-details ._data=${emiData}></loanemi-details>`
    );

    expect(el._data).to.deep.equal(emiData);
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
}); */
