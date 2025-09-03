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
    <View style={styles.addOnItem}>
      <Text style={styles.addOnName}>{name}</Text>
      <View style={styles.addOnRight}>
        <Text style={styles.addOnPrice}>Ksh {price}</Text>
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
    </View>
  );
};

const DishDetailScreen = () => {
  const router = useRouter();
  const { dish } = useLocalSearchParams();

  // Parse the dish param back into an object
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.headerIcon}>←</Text>
          </TouchableOpacity>
          <Image
            source={require("../../assets/licky-fish-logo.jpg")}
            style={styles.logo}
          />
          <TouchableOpacity>
            <Text style={styles.headerIcon}>🛍️</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            {parsedDish?.image && (
              <Image source={parsedDish.image} style={styles.productImage} />
            )}
          </View>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.productName}>{parsedDish?.name}</Text>
            <Text style={styles.productDescription}>{parsedDish?.description}</Text>

            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryIcon}>🚚</Text>
              <Text style={styles.deliveryText}>
                Delivery Time <Text style={styles.deliveryTime}>20 minutes</Text>
              </Text>
            </View>

            {/* Add-ons */}
            <Text style={styles.addOnsTitle}>Add</Text>
            <AddOnItem name="Ugali" price={50} onQuantityChange={onAddOnQuantityChange} />
            <AddOnItem name="Kachumbari" price={50} onQuantityChange={onAddOnQuantityChange} />
            <AddOnItem name="SukumaWiki" price={50} onQuantityChange={onAddOnQuantityChange} />
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
            <Text style={styles.addButtonText}>Add for Ksh {calculateTotalPrice()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DishDetailScreen;

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  headerIcon: { fontSize: 24, color: "#333" },
  logo: { width: 100, height: 40, resizeMode: "contain" },

  imageContainer: { width: "100%", height: 250, position: "relative" },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  detailsContainer: { padding: 20 },
  productName: { fontSize: 28, fontWeight: "bold", color: "#222", marginBottom: 10 },
  productDescription: { fontSize: 16, color: "#666", lineHeight: 22, marginBottom: 20 },
  deliveryInfo: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  deliveryIcon: { fontSize: 20, marginRight: 10 },
  deliveryText: { fontSize: 16, color: "#444" },
  deliveryTime: { fontWeight: "bold" },
  addOnsTitle: { fontSize: 20, fontWeight: "bold", color: "#222", marginBottom: 10 },

  addOnItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  addOnName: { fontSize: 16, color: "#333" },
  addOnRight: { flexDirection: "row", alignItems: "center" },
  addOnPrice: { fontSize: 16, color: "#333", marginRight: 15 },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
  },
  quantityButton: { paddingHorizontal: 10, paddingVertical: 5 },
  quantityText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  quantityCount: { fontSize: 16, paddingHorizontal: 10, color: "#333" },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
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
    paddingHorizontal: 30,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});