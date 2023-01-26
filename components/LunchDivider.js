import React from "react";
import { View } from "react-native";

const offWhite = "#f3f2f8";
//make this global so i dont have to keep calling it lOL!

export default function LunchDivider() {
    return (
        <View
        style={{
          height: 1,
          width: "80%",
          marginTop: "1.5%",
          marginBottom: "1.5%",
          marginLeft: "7.5%",
          backgroundColor: offWhite,
        }}
      />
    );
  };