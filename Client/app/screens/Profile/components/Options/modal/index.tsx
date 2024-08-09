import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import useNotification from "@/app/hooks/useNotification";
import Loading from "@/app/components/Loading";
import COLORS from "@/app/screens/Welcome/constants/color";
import { postChangePassword } from "@/app/services/api/auth/endpoints";
import { useAuth } from "@/app/context/AuthContext";

interface PasswordChangeFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordChangeModalProps {
  visible: boolean;
  onClose: () => void;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
  visible,
  onClose,
}) => {
  const { user } = useAuth();
  const toastConfig = useNotification();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordChangeFormInputs>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const onSubmit: SubmitHandler<PasswordChangeFormInputs> = async (data) => {
    try {
      setLoading(true);
      await postChangePassword(
        Number(user?.userId),
        data.currentPassword,
        data.newPassword
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Password changed successfully!",
      });
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error changing password:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to change password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.header}>Change Password</Text>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={26} color={COLORS.primary} />
            <Controller
              control={control}
              rules={{ required: "Current password is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Current Password"
                  secureTextEntry={!passwordVisible}
                  style={styles.textInput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="currentPassword"
            />
            {errors.currentPassword && (
              <Text style={styles.errorText}>
                {errors.currentPassword.message}
              </Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={26} color={COLORS.primary} />
            <Controller
              control={control}
              rules={{ required: "New password is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="New Password"
                  secureTextEntry={!passwordVisible}
                  style={styles.textInput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="newPassword"
            />
            {errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword.message}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={26} color={COLORS.primary} />
            <Controller
              control={control}
              rules={{
                required: "Confirm password is required",
                validate: (value) =>
                  value === newPassword || "Passwords must match",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry={!passwordVisible}
                  style={styles.textInput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          <View style={styles.bottomContainer}>
            {loading ? (
              <Loading message="Changing password..." />
            ) : (
              <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Change Password</Text>
              </Pressable>
            )}
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#323232",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
    backgroundColor: "white",
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  errorText: {
    color: "red",
    marginLeft: 10,
  },
  bottomContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    width: "100%",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: 18,
  },
});

export default PasswordChangeModal;
