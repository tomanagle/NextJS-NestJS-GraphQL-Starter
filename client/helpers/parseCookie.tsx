function parseCookie({ cookie, name = null }) {
  const res = cookie.split('; ').reduce((acc, curr) => {
    const cookie = curr.split('=');
    acc[cookie[0]] = cookie[1];
    return acc;
  }, {});

  if (name) return res[name];
  return res;
}

export default parseCookie;
