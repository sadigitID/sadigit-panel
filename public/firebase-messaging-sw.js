
importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    vapidKey: "BOVG8H0DJlMZK9f5V6Lfx2PdeQkaVfZ-5VwvhMfoRTXEuLoAe1nz22K3SEjQJvdb7XWjzMwZkS94hr_z_dT1IIw",
    apiKey: "AIzaSyA8nnosKwDqOO-9vcnQDNLgg0B9h0s57qE",
    authDomain: "daftarmenu-6329e.firebaseapp.com",
    projectId: "daftarmenu-6329e",
    storageBucket: "daftarmenu-6329e.appspot.com",
    messagingSenderId: "781189605118",
    appId: "1:781189605118:web:8e619bb26e665998e2e7af",
    measurementId: "G-PNJTNZ91L8"
});

const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  console.log('Pesan background:', payload);

  // Kirim event ke semua tab client
  self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'fcm-message',
        data: payload
      });
    });
  });

  // Tampilkan push notification Chrome
  const { title, body } = payload.notification;
  self.registration.showNotification(title, { body });
});
