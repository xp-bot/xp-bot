import { replace } from 'lodash';

export default (n: number) =>
  replace(n.toFixed(0).toString(), /\B(?=(\d{3})+(?!\d))/g, ',');
