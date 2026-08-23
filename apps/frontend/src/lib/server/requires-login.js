/** @param {string} pathname */
export const requiresLogin = (pathname) =>
  (pathname.startsWith('/map-making') && pathname !== '/map-making/docs/meta-uploads') ||
  pathname === '/personal' ||
  pathname.startsWith('/personal/') ||
  pathname.startsWith('/profile');
