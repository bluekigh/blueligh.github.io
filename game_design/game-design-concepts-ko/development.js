// The screen label is a local development aid; it remains hidden on production hosts.
if (['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) || location.protocol === 'file:') {
  document.getElementById('screen-label').hidden = false;
}
