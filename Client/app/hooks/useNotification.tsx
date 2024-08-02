import * as Notifications from "expo-notifications";

// Custom hook'un tanımlanması
export const useNotification = () => {
  // Başarılı bildirim göster
  const showSuccessNotification = async (message: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Başarılı 🎉",
        body: message,
        data: { type: "success" },
      },
      trigger: null, // Hemen göster
    });
  };

  // Hata bildirimi göster
  const showErrorNotification = async (message: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hata ❌",
        body: message,
        data: { type: "error" },
      },
      trigger: null, // Hemen göster
    });
  };

  // Uyarı bildirimi göster
  const showWarningNotification = async (message: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Uyarı ⚠️",
        body: message,
        data: { type: "warning" },
      },
      trigger: null, // Hemen göster
    });
  };

  // Hook'tan fonksiyonları döndür
  return {
    showSuccessNotification,
    showErrorNotification,
    showWarningNotification,
  };
};
