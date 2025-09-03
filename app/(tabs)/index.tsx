import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Use useRouter from expo-router
import React, { useEffect, useState } from 'react';
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
} from 'react-native';

// Type definition for dishes
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
  {
    id: "3",
    name: "Fish with Ugali",
    description:
      "A classic Kenyan dish featuring a whole fish prepared your way, served with a generous portion of ugali.",
    image: require("../../assets/friedfish.jpeg"),
    price: 350,
    category: "Accompaniments",
  },
  {
    id: "4",
    name: "Fish with Chips",
    description:
      "Golden fried fish served with crispy chips, a perfect meal for a quick bite.",
    image: require("../../assets/Wet Fry.jpeg"),
    price: 450,
    category: "Accompaniments",
  },
];

const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Soft Drinks",
  "Alcohol",
  "Accompaniments",
];

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredDishes, setFilteredDishes] = useState(dishes);

  // Use the useRouter hook for Expo Router navigation
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
            source={require("../../assets/licky-fish-logo.jpg")}
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
          <Text style={styles.sectionTitle}>This Week's Specials!</Text>
          <FlatList
            data={filteredDishes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                // Use router.push() to navigate and pass data
                onPress={() =>
                  router.push({
                    pathname: 'DishDetail',
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
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  promoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#267A8A",
    padding: 20,
  },
  promoTextContainer: {
    flex: 1,
    paddingRight: 15,
  },
  promoTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  promoSubtitle: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 10,
  },
  promoDescription: {
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
  },
  promoImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  mainContent: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  deliveryButton: {
    backgroundColor: "#C0C0C0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#267A8A",
  },
  buttonText: {
    color: "#444",
    fontWeight: "bold",
  },
  list: {},
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
});