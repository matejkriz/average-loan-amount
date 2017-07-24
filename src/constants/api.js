import { name, repository, version } from '../../package.json';

const api = {
  corsProxy: 'https://crossorigin.me/',
  headers: {
    'Content-Type': 'application/json',
    Origin: 'https://app.zonky.cz',
    'User-Agent': `${name}/${version} (${repository})`,
  },
  path: 'https://api.zonky.cz/loans/marketplace',
};

export default api;
