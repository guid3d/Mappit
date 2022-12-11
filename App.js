// In App.js in a new project

import * as React from "react";
import MainStackView from "./navigators/MainStack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { CurrentLocationProvider } from "./hooks/useCurrentLocation";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

function App() {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          {/* <CurrentLocationProvider> */}
          {/* <StatusBar /> */}
          <MainStackView />
          <Toast />
          {/* </CurrentLocationProvider> */}
        </SafeAreaProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}

export default App;
