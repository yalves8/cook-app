import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Recipe } from "@/components/Recipe";
import { Ingredients } from "@/components/Ingredients";
import { services } from "@/services";
import { useEffect, useState } from "react";

export default function Recipes() {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);

  const params = useLocalSearchParams<{ ingredientsIds: string }>();
  const ingredientesIds = params.ingredientsIds.split(",");

  useEffect(() => {
    services.ingredients.findByIds(ingredientesIds).then(setIngredients);
  }, []);

  useEffect(() => {
    services.recipes.findByIngredientsIds(ingredientesIds).then(setRecipes);
    console.log(recipes);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={32}
          onPress={() => router.back()}
        />
        <Text style={styles.title}> Ingredientes</Text>
      </View>

      <Ingredients ingredients={ingredients} />

      {!recipes.length ? (
        <Text style={styles.message}>
          Nenhuma receita foi encontrada com o(s) produto(s) selecionado(s).
        </Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Recipe
              recipe={item}
              onPressOut={() => router.navigate("/recipe/" + item.id)}
            />
          )}
          style={styles.recipes}
          contentContainerStyle={styles.recipesContent}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ gap: 16 }}
          numColumns={2}
        />
      )}
    </View>
  );
}
