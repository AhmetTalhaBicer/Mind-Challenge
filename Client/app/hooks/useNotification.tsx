import React from "react";
import {
  BaseToast,
  ErrorToast,
  InfoToast,
  ToastProps,
} from "react-native-toast-message";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface ToastConfig {
  [key: string]: (props: ToastProps) => JSX.Element;
  success: (props: ToastProps) => JSX.Element;
  error: (props: ToastProps) => JSX.Element;
  info: (props: ToastProps) => JSX.Element;
}

const useNotification = (): ToastConfig => {
  const toastConfig: ToastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={styles.successToast}
        contentContainerStyle={styles.contentContainer}
        text1Style={styles.text1}
        text2Style={styles.text2}
        renderLeadingIcon={() => (
          <Icon name="check-circle" size={24} color="green" />
        )}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={styles.errorToast}
        contentContainerStyle={styles.contentContainer}
        text1Style={styles.text1}
        text2Style={styles.text2}
        renderLeadingIcon={() => (
          <Icon name="times-circle" size={24} color="red" />
        )}
      />
    ),
    info: (props) => (
      <InfoToast
        {...props}
        style={styles.infoToast}
        contentContainerStyle={styles.contentContainer}
        text1Style={styles.text1}
        text2Style={styles.text2}
        renderLeadingIcon={() => (
          <Icon name="info-circle" size={24} color="blue" />
        )}
      />
    ),
  };

  return toastConfig;
};

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: "green",
    backgroundColor: "#e0ffe0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "green",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 10,
    margin: 10,
  },
  errorToast: {
    borderLeftColor: "red",
    backgroundColor: "#ffe0e0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "red",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 10,
    margin: 10,
  },
  infoToast: {
    borderLeftColor: "blue",
    backgroundColor: "#e0e0ff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "blue",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 10,
    margin: 10,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  text2: {
    fontSize: 16,
    color: "#555",
  },
});

export default useNotification;
