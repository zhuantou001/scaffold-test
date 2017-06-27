import queryString from 'query-string';
import Router from '../web-config/router';

export default {
  getQuery () {
    let urlQuery = queryString.parse(window.location.search);
    let routerQuery = Router.router.currentRoute.query;
    return Object.assign({}, urlQuery, routerQuery);
  }
};
