/* ═══════════════════════════════════════════════════
   FIREBASE CONFIG — shared by the site (js/app.js) and
   the admin panel (admin/js/*.js)
═══════════════════════════════════════════════════ */

const firebaseConfig = {
  apiKey: "AIzaSyDs3MUBiCn8yHQJ6HTvO2gV-OPrql0ed6I",
  authDomain: "mj-wedding-3d797.firebaseapp.com",
  projectId: "mj-wedding-3d797",
  storageBucket: "mj-wedding-3d797.firebasestorage.app",
  messagingSenderId: "148752139043",
  appId: "1:148752139043:web:6cbcd1a5471a05dc5c0296"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
