import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { getUser } from "@/app/services/api/user/endpoints";
import { UserDTO } from "@/app/services/api/user/types";

const User = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUser({
          username: "username",
          password: "password",
        });
        setUsers(response.data.result);
      } catch (error: any) {
        console.error("Failed to fetch users:", error);
        setError(error?.message || "Bilinmeyen bir hata oluştu");
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>Hatalar: {error}</Text>
      ) : (
        users.map((user: UserDTO, index) => (
          <View key={index} style={styles.usernameContainer}>
            <Text>{user.username}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  usernameContainer: {
    marginVertical: 10,
  },
  errorText: {
    color: "red",
  },
});

export default User;
