import routes from '@/config/routes';

export const localeMenu = (path) => {
  if (path === '/') {
    return routes['app'];
  }
  return routes["app" + path.replace(/\//g, ".")];
}