import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Reusable add-on component
const AddOnItem = ({ name, price, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onQuantityChange(name, quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    onQuantityChange(name, quantity + 1);
  };

  return (
    <View style={styles.addOnCard}>
      <View>
        <Text style={styles.addOnName}>{name}</Text>
        <Text style={styles.addOnPrice}>Ksh {price}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityCount}>{quantity}</Text>
        <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DishDetailScreen = () => {
  const router = useRouter();
  const { dish } = useLocalSearchParams();

  const parsedDish = dish ? JSON.parse(dish as string) : null;

  const [mainDishQuantity, setMainDishQuantity] = useState(1);
  const [addOns, setAddOns] = useState({
    Ugali: 0,
    Kachumbari: 0,
    SukumaWiki: 0,
  });

  const addOnPrice = 50;

  const calculateTotalPrice = () => {
    let total = mainDishQuantity * (parsedDish?.price || 0);
    total += addOns.Ugali * addOnPrice;
    total += addOns.Kachumbari * addOnPrice;
    total += addOns.SukumaWiki * addOnPrice;
    return total;
  };

  const onAddOnQuantityChange = (name, newQuantity) => {
    setAddOns((prev) => ({ ...prev, [name]: newQuantity }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {/* Header with back + cart */}
        <View style={styles.header}>
          <TouchableOpacity
  onPress={() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("(tabs)"); // fallback to home screen
    }
  }}
  style={styles.headerBtn}
>
  <Text style={styles.headerIcon}>←</Text>
</TouchableOpacity>

          <Image
            source={require("../assets/licky-fish-logo.jpg")}
            style={styles.logo}
          />
          <TouchableOpacity style={styles.headerBtn}>
            <Text style={styles.headerIcon}>🛒</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            {parsedDish?.image && (
              <Image source={parsedDish.image} style={styles.productImage} />
            )}
          </View>

          {/* Dish Info */}
          <View style={styles.detailsCard}>
            <Text style={styles.productName}>{parsedDish?.name}</Text>
            <Text style={styles.productDescription}>
              {parsedDish?.description}
            </Text>

            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryIcon}>🚚</Text>
              <Text style={styles.deliveryText}>
                Delivery Time <Text style={styles.deliveryTime}>20 minutes</Text>
              </Text>
            </View>
          </View>

          {/* Add-ons */}
          <View style={styles.addOnsContainer}>
            <Text style={styles.addOnsTitle}>Make it better</Text>
            <AddOnItem
              name="Ugali"
              price={50}
              onQuantityChange={onAddOnQuantityChange}
            />
            <AddOnItem
              name="Kachumbari"
              price={50}
              onQuantityChange={onAddOnQuantityChange}
            />
            <AddOnItem
              name="SukumaWiki"
              price={50}
              onQuantityChange={onAddOnQuantityChange}
            />
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              onPress={() => setMainDishQuantity(Math.max(1, mainDishQuantity - 1))}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityCount}>{mainDishQuantity}</Text>
            <TouchableOpacity
              onPress={() => setMainDishQuantity(mainDishQuantity + 1)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>
              Add for Ksh {calculateTotalPrice()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DishDetailScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  headerBtn: {
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 30,
  },
  headerIcon: { fontSize: 18, fontWeight: "600", color: "#333" },
  logo: { width: 90, height: 35, resizeMode: "contain" },

  imageContainer: { width: "100%", height: 280 },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  detailsCard: {
    padding: 20,
    backgroundColor: "#fff",
  },
  productName: { fontSize: 26, fontWeight: "bold", color: "#222" },
  productDescription: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
    marginVertical: 10,
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  deliveryIcon: { fontSize: 18, marginRight: 6 },
  deliveryText: { fontSize: 14, color: "#444" },
  deliveryTime: { fontWeight: "bold" },

  addOnsContainer: { paddingHorizontal: 20, marginTop: 10 },
  addOnsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },
  addOnCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  addOnName: { fontSize: 16, fontWeight: "600", color: "#333" },
  addOnPrice: { fontSize: 14, color: "#888", marginTop: 4 },

  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  quantityButton: { paddingHorizontal: 10, paddingVertical: 5 },
  quantityText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  quantityCount: { fontSize: 16, paddingHorizontal: 8, color: "#333" },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#267A8A",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
