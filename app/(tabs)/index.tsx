import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Dish = {
  id: string;
  name: string;
  description: string;
  image: any;
  price: number;
  category: string;
};

const dishes: Dish[] = [
  {
    id: "1",
    name: "Deep Fried Tilapia",
    description:
      "Crispy on the outside, tender on the inside. Our tilapia is seasoned with a house blend of spices and deep-fried golden brown.",
    image: require("../../assets/friedfish.jpeg"),
    price: 350,
    category: "Lunch",
  },
  {
    id: "2",
    name: "Wet Fry Fish",
    description:
      "Pan-fried fish simmered in a rich tomato-onion sauce with green peppers and spices. Juicy, flavorful, and best paired with ugali or chapati.",
    image: require("../../assets/Wet Fry.jpeg"),
    price: 450,
    category: "Lunch",
  },
];

const categories = ["All", "Breakfast", "Lunch", "Soft Drinks"];

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredDishes, setFilteredDishes] = useState(dishes);

  const router = useRouter();

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredDishes(dishes);
    } else {
      setFilteredDishes(
        dishes.filter((dish) => dish.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="menu" size={28} color="black" />
          </TouchableOpacity>
          <Image
            source={require("../../assets/licky-fish-logo.png")}
            style={styles.logo}
          />
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>

        {/* Promo Section */}
        <View style={styles.promoContainer}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>LICKY FISH</Text>
            <Text style={styles.promoSubtitle}>Restaurant</Text>
            <Text style={styles.promoDescription}>
              We are a renowned restaurant in the Ruaka area, best known for our
              flavorful fish dishes and warm service. At Licky Fish, we serve
              more than just fish—our diverse menu has something for everyone.
            </Text>
          </View>
          <Image
            source={require("../../assets/promo-image.jpeg")}
            style={styles.promoImage}
          />
        </View>

        {/* Categories */}
        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>ORDER FOR DELIVERY!</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.buttonContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.deliveryButton,
                  selectedCategory === category && styles.selectedButton,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedCategory === category && { color: "#fff" },
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Specials */}
          <Text style={styles.sectionTitle}>This Week’s Specials!</Text>
          <FlatList
            data={filteredDishes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: "DishDetail",
                    params: { dish: JSON.stringify(item) },
                  })
                }
              >
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <Text style={styles.price}>Ksh {item.price}</Text>
                </View>
                <Image source={item.image} style={styles.image} />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.list}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingBottom: 20 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  logo: { width: 100, height: 40, resizeMode: "contain" },

  promoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#44CED0",
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  promoTextContainer: { flex: 1, paddingRight: 15 },
  promoTitle: { fontSize: 28, fontWeight: "bold", color: "#000" },
  promoSubtitle: { fontSize: 20, fontWeight: "600", color: "#000" },
  promoDescription: { fontSize: 14, color: "#000", lineHeight: 20 },
  promoImage: { width: 100, height: 100, borderRadius: 8 },

  mainContent: { paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    marginTop: 15,
  },

  buttonContainer: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  deliveryButton: {
    backgroundColor: "#C0C0C0",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 10,
    alignItems: "center",
  },
  selectedButton: { backgroundColor: "#267A8A" },
  buttonText: { color: "#000", fontWeight: "bold" },

  list: {},
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  image: { width: 90, height: 90, borderRadius: 8 },
  textContainer: { flex: 1, paddingRight: 12 },
  name: { fontSize: 16, fontWeight: "bold", color: "#000" },
  description: { fontSize: 12, color: "#555", marginTop: 4 },
  price: { fontSize: 14, fontWeight: "bold", color: "#000", marginTop: 6 },
});
