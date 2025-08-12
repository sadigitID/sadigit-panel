import { onMessage } from "firebase/messaging";
import { messaging } from "@/firebase";

export async function initNotification() {
  try {
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }

    console.log("Meminta token FCM...");
  } catch (error) {
    console.error("getToken error:", error);
  }
}

onMessage(messaging, (payload) => {
  console.log("Pesan foreground:", payload);
  
  // Dispatch custom event ke Vue
  const event = new CustomEvent('fcm-message', { detail: payload });
  window.dispatchEvent(event);
});
