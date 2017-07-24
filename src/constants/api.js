import { name, repository, version } from '../../package.json';

const api = {
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': `${name}/${version} (${repository})`,
  },
  path: 'https://api.zonky.cz/loans/marketplace',
};

export default api;
