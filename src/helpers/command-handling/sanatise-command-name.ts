import { replace } from 'lodash';

export default (name: string) => replace(name, /[^a-z]+/g, '_');
