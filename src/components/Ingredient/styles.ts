import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: theme.colors.gray_200,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 10,
    height: 42,
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    //width: "32%",
    //maxWidth: "25%",
  },
  title: {
    fontSize: theme.fonts.size.body.sm,
    fontFamily: theme.fonts.family.medium,
    //flexWrap: "wrap",
  },

  image: {
    width: 16,
    height: 16,
  },
  selected: {
    borderWidth: 2,
    borderColor: theme.colors.green_600,
    backgroundColor: theme.colors.green_100,
  },
});
