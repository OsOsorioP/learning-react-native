import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const icon = require("../assets/icon.png");

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Image
          source={icon}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
