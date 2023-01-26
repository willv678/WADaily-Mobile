import React from "react";
import { View, Text } from "react-native";
import styles from "../Stylesheet";

export default function LunchItems({title, type}) {
    return (
        <View style={styles.listItem}>
        <Text style={type === "entry" ? styles.lunchItems : styles.lunchTitle}>
          {title}{" "}
        </Text>
      </View>
    );
  };