import { Router } from '@vaadin/router';

const outlet = document.getElementById('container');
const router = new Router(outlet);
router.setRoutes([
  { path: '/dashBoard', component: 'dash-board' },
  { path: '/details', component: 'stock-details' },
  /* { path: "/users/:user", component: "x-user-profile" },
  { path: "(.*)", component: "x-not-found-view" }, */
]);
