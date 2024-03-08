import { Pressable, PressableProps, Image, Text } from "react-native";
import { styles } from "./styles";

export type IngredientsProps = {
  name: string;
  image: string;
  selected?: boolean;
};

export function Ingredient({
  name,
  image,
  selected = false,
  ...rest
}: IngredientsProps & PressableProps) {
  return (
    //componente que interage com o toque
    <Pressable
      style={[styles.container, selected && styles.selected]}
      {...rest}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}> {name}</Text>
    </Pressable>
  );
}
