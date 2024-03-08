import { Slot } from "expo-router";

import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";

export default function Layout() {
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
  });

  if (!fontLoaded) {
    return;
  }

  return fontLoaded ? <Slot /> : null;
}
