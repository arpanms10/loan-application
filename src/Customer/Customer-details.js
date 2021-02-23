import { html, css, LitElement } from 'lit-element';

import '@lion/form/lion-form.js';
import '@lion/button/lion-button.js';
import '@lion/input/lion-input.js';
import '@lion/input-datepicker/lion-input-datepicker.js';
import '@lion/input-email/lion-input-email.js';
import '@lion/input-amount/lion-input-amount.js';
import '@lion/checkbox-group/lion-checkbox-group.js';
import '@lion/checkbox-group/lion-checkbox.js';
import {
  MinLength,
  MaxLength,
  Required,
  Pattern,
  MinMaxDate,
} from '@lion/form-core';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import { localize, LocalizeMixin } from '@lion/localize';
import '../../locale/inline-data.js';
import { Router } from '@vaadin/router';

loadDefaultFeedbackMessages();
export class CustomerDetails extends LocalizeMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        margin: 0;
      }
      .container {
        width: 60%;
        margin: 0;
        font-family: sans-serif;
        letter-spacing: 1px;
        font-size: 14px;
        justify-content: space-evenly;
        margin: auto;
        flex-wrap: wrap;
        padding: 20px;
      }
      .form-input {
        margin: 10px;
      }
      .backbg-btn-color {
        background-color: grey;
        cursor: pointer;
      }
      .nextbg-btn-color {
        background-color: green;
        cursor: pointer;
      }
    `;
  }

  static get properties() {
    return {};
  }

  render() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const mindate = new Date(year - 80, month, day);
    const maxdate = new Date(year, month, day);

    const submitHandler = ev => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find(el =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      const formData = ev.target.serializedValue;
      fetch('https://loanfeapi.herokuapp.com/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(response => {
        if (response.status === 200) {
          Router.go('/success');
        } else {
          Router.go('/error');
        }
      });
    };

    return html`
      <div class="container">
        <h2>${localize.msg('change-language:customer')}</h2>
        <lion-form @submit=${submitHandler}>
          <form @submit=${ev => ev.preventDefault()}>
            <lion-input
              class="form-input"
              name="first_name"
              id="first_name"
              label="${localize.msg('change-language:firstname')}"
              .validators=${[
                new Pattern(/^[a-zA-Z\s]*$/),
                new MinLength(3),
                new Required(),
              ]}
            >
            </lion-input>
            <lion-input
              class="form-input"
              name="last_name"
              id="last_name"
              label="${localize.msg('change-language:lastname')}"
              .validators=${[
                new Pattern(/^[a-zA-Z\s]*$/),
                new MinLength(3),
                new Required(),
              ]}
            >
            </lion-input>
            <lion-input-datepicker
              class="form-input"
              name="dateof_birth"
              id="dateof_birth"
              label="${localize.msg('change-language:dateofbirth')}"
              .modelValue=${new Date(today)}
              .validators=${[
                new MinMaxDate({
                  min: new Date(mindate),
                  max: new Date(maxdate),
                }),
              ]}
            >
            </lion-input-datepicker>
            <lion-input-email
              class="form-input"
              name="email"
              id="email"
              .validators=${[
                new Pattern(
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                ),
                new Required(),
              ]}
              label="${localize.msg('change-language:email')}"
            >
            </lion-input-email>
            <lion-input
              class="form-input"
              name="mobile_number"
              id="mobile_number"
              label="${localize.msg('change-language:mobilenumber')}"
              .validators=${[
                new Pattern(/(6|7|8|9)\d{9}/),
                new MinLength(10),
                new MaxLength(10),
                new Required(),
              ]}
            >
            </lion-input>
            <lion-input-amount
              class="form-input"
              name="monthly_salary"
              id="monthly_salary"
              label="${localize.msg('change-language:monthlysalary')}"
              .validators=${[new Required()]}
            >
            </lion-input-amount>
            <lion-input-amount
              class="form-input"
              name="EMIs_amount"
              id="EMIs_amount"
              label="${localize.msg('change-language:previousemi')}"
              .validators=${[new Required()]}
            >
            </lion-input-amount>

            <lion-checkbox-group
              class="form-input"
              id="terms"
              name="terms"
              .validators="${[
                new Required(null, {
                  getMessage: () => 'Please select to continue',
                }),
              ]}"
            >
              <lion-checkbox
                id="terms"
                label="${localize.msg('change-language:checkbox')}"
              ></lion-checkbox>
            </lion-checkbox-group>
            <div
              class="form-input"
              style="display:flex ;justify-content: space-around;"
            >
              <lion-button
                class="backbg-btn-color"
                raised
                @click=${this._toEmidetails}
                >${localize.msg('change-language:back')}
              </lion-button>
              <lion-button class="nextbg-btn-color" id="nextbtn" raised
                >${localize.msg('change-language:next')}</lion-button
              >
            </div>
          </form>
        </lion-form>
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _toEmidetails() {
    Router.go('/emidetails');
  }
}

window.customElements.define('customer-details', CustomerDetails);
