'use strict';

/* Turns Firebase Auth error codes into plain-language messages */
function friendlyAuthError(code) {
  switch (code) {
    case 'auth/invalid-email':
      return 'That email address doesn\'t look right.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a bit and try again.';
    case 'auth/network-request-failed':
      return 'Network error — check your connection.';
    default:
      return 'Login failed. Please try again.';
  }
}

/* Guard for dashboard.html: redirect to login if not authenticated.
   Calls onReady(user) once we know the user is logged in. */
function requireAuth(onReady) {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      window.location.href = 'login.html';
    } else {
      onReady(user);
    }
  });
}

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = 'login.html';
  });
}

'use strict';

/* ═══════════════════════════════
   ADMIN PWA INSTALL
   Registers the site's service worker (its scope already covers
   /admin/ since it's a sub-path) and wires up the visible
   "Install App" button using the beforeinstallprompt event.
═══════════════════════════════ */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // '../sw.js' -> registered scope defaults to its own folder (site root),
    // which covers /admin/ too since it's a sub-path.
    navigator.serviceWorker.register('../sw.js')
      .then(reg => console.log('[Admin] Service worker registered:', reg.scope))
      .catch(err => console.warn('[Admin] Service worker registration failed:', err));
  });
}

let deferredAdminInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredAdminInstallPrompt = e;
  document.getElementById('admin-install-btn')?.classList.add('show');
});

function installAdminApp() {
  if (!deferredAdminInstallPrompt) return;
  deferredAdminInstallPrompt.prompt();
  deferredAdminInstallPrompt.userChoice.finally(() => {
    deferredAdminInstallPrompt = null;
    document.getElementById('admin-install-btn')?.classList.remove('show');
  });
}

window.addEventListener('appinstalled', () => {
  document.getElementById('admin-install-btn')?.classList.remove('show');
  deferredAdminInstallPrompt = null;
});
