import { html, css, LitElement } from 'lit-element';
import { Required, MinMaxNumber } from '@lion/form-core';
import '@lion/input/lion-input.js';
import '@lion/input-amount/lion-input-amount.js';
import '@lion/input-range/lion-input-range.js';
import '@lion/button/lion-button.js';
// import {inwords} '../utils/numToWord.js';

export class BasicDetails extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--loan-application-text-color, #000);
        font-family: monospace;
        font-size: 1.5rem;
      }
      h2 {
        font-size: 2rem;
        font-family: monospace;
        text-align: center;
      }
      .form-field {
        width: 50%;
        padding: 10px 5px;
        margin: auto;
        height: 5%;
      }
      .form-basic {
        margin: auto;
      }
      input {
        height: 25px;
        padding: 4px;
        text-transform: capitalize;
        border: 2px solid grey;
        border-radius: 5px;
      }
      .form-control:focus {
        outline: none;
        box-shadow: 10px grey;
      }
      .btn-previous {
        background-color: #ff0000;
        color: white;
        border-radius: 5px;
        /* width:100px; */
        /* text-align:center; */
      }
      .btn-next {
        background-color: dodgerblue;
        color: white;
        border-radius: 5px;
        /* width:100px; */
      }
      .button-content {
        text-align: left;
      }
      .btn-prev-nxt-parent {
        margin: 20px auto;
        width: 50%;
        display: flex;
        justify-content: space-between;
      }
    `;
  }

  constructor() {
    super();
    this.duration = 5;
    this.range = 2;
  }

  render() {
    return html` <div class="form-basic">
      <h2>Loan Details</h2>
      <lion-form>
        <form class="basic-web-form">
          <div class="basic-form">
            <lion-input
              label="Name"
              .validators="${[
                new Required(
                  {},
                  { getMessage: () => 'Name is a required field' }
                ),
              ]}"
            ></lion-input>

            <lion-input-amount
              type="Number"
              name="amount"
              id="amount"
              .validators="${[
                new MinMaxNumber(
                  { min: 100000, max: 10000000 },
                  {
                    getMessage: () =>
                      'Should enter an amount greater than one lakh ',
                  }
                ),
                new Required(
                  {},
                  { getMessage: () => 'Amount is a required field' }
                ),
              ]}"
              .modelValue="${this.duration}"
              label="Amount"
            >
              @keyup = ${this._numToWord}
            </lion-input-amount>

            <div class="word"></div>

            <lion-input-range
              style="max-width: 400px;"
              min="1"
              max="20"
              step="1"
              .modelValue="${this.range}"
              label="Loan Period"
            >
            </lion-input-range>
          </div>
        </form>
      </lion-form>

      <div class="btn-prev-nxt-parent">
        <lion-button class="btn-previous">Prev</lion-button>
        <lion-button class="btn-next">Next</lion-button>
      </div>
    </div>`;
  }

  // _numToWord(){
  //   this.shadowRoot.querySelector(".word").innerHTML = inwords(this.shadowRoot.querySelector(".basic-web-form").elements["amount"].value);

  // }
}
customElements.define('basic-details', BasicDetails);
