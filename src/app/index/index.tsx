import {
  View,
  Text,
  ScrollView,
  Alert,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { Ingredient } from "@/components/Ingredient";
import { Selected } from "@/components/Selected";
import { services } from "@/services";
import { Icon, SearchBar } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";

export default function Index() {
  const [selected, setSelected] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value));
    }
    setSelected((state) => [...state, value]);
    //console.log(selected);
  }

  function handleClearSelected() {
    Alert.alert("Limpar", "Deseja limpar tudo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => setSelected([]) },
    ]);
  }

  function handleSearch() {
    router.navigate("/recipes/" + selected);
  }

  async function updateSearch(search: string) {
    setSearchText(search);
    const ingrediente = search
      ? await services.ingredients.findByName(search)
      : await services.ingredients.findAll();

    setIngredients(ingrediente);
    //const response = await services.getIngredientsByName(search);
  }

  function onAddSticker() {
    setIsModalVisible(true);
  }

  function onModalClose() {
    setIsModalVisible(false);
  }

  useEffect(() => {
    services.ingredients.findAll().then(setIngredients);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {"\n"}
        <Text style={styles.subTitle}>os produtos</Text>
      </Text>
      <Text style={styles.message}>
        Descubra receitas baseadas nos produtos que você escolheu.
      </Text>
      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Pesquise aqui..."
          onChangeText={updateSearch}
          value={searchText}
          lightTheme={true}
          containerStyle={{
            borderColor: "white",
            backgroundColor: "white",
            borderTopColor: "white",
            borderBottomColor: "white",
            paddingLeft: 2,
            width: "85%",
          }}
          inputContainerStyle={{ backgroundColor: "#C4C4CC" }}
          //searchIcon={<Icon name="sc-telegram" type="evilicon" color="#517fa4" />}
        />
        <MaterialIcons
          size={32}
          name="filter-list-alt"
          onPress={() => setIsModalVisible(true)}
          style={styles.filterList}
        />
      </View>

      <ScrollView contentContainerStyle={styles.ingredients}>
        {ingredients.map((item) => (
          <Ingredient
            key={item.id}
            name={item.name}
            image={`${services.storage.imagePath}/${item.image}`}
            selected={selected.includes(item.id)}
            onPress={() => handleToggleSelected(item.id)}
          />
        ))}
      </ScrollView>

      {selected.length > 0 && (
        <Selected
          quantity={selected.length}
          onClear={handleClearSelected}
          onSearch={handleSearch}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable onPress={onModalClose}>
              <MaterialIcons name="close" size={22} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
