import { useCallback } from "react";
import { Alert, Text, View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";

import { useAuth } from "~/utils/authProvider";

export default function SignIn() {
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
    redirectUrl: "exp://",
  });

  const { user } = useAuth();

  const onGooglePress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        void setActive?.({ session: createdSessionId });
      }
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error));
    }
  }, [startOAuthFlow]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{user?.id}</Text>
      <Text onPress={onGooglePress}>Sign In</Text>
    </View>
  );
}
