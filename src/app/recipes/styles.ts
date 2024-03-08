import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 32,
    paddingTop: 62,
    marginBottom: 12,
  },
  title: {
    fontSize: theme.fonts.size.heading.md,
    fontFamily: theme.fonts.family.bold,
    marginTop: 22,
  },
  recipes: {
    padding: 32,
  },
  recipesContent: {
    gap: 16,
  },
  message: {
    fontSize: theme.fonts.size.heading.md,
    marginTop: 12,
    marginBottom: 38,
    fontFamily: theme.fonts.family.regular,
    padding: 32,
    color: theme.colors.gray_400,
  },
});
