// app/screens/CheckoutScreen.tsx
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CheckoutRouteProp = RouteProp<
  { params: { dish: { id: string; name: string; image: any; price: number } } },
  "params"
>;

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const route = useRoute<CheckoutRouteProp>();
  const { dish } = route.params;

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = dish.price * quantity;

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Dish Details */}
      <Image source={dish.image} style={styles.image} />
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.price}>${dish.price.toFixed(2)}</Text>

      {/* Quantity Controls */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.qtyButton} onPress={handleDecrease}>
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyValue}>{quantity}</Text>
        <TouchableOpacity style={styles.qtyButton} onPress={handleIncrease}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Total */}
      <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Proceed to Pay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backText: {
    fontSize: 20,
  },
  image: {
    width: 250,
    height: 180,
    borderRadius: 12,
    marginVertical: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    color: "gray",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  qtyButton: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  qtyText: {
    fontSize: 20,
  },
  qtyValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  checkoutButton: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
