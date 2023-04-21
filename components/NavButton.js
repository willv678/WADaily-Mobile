import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NavButton({ name , navigation, icon}) {
    <Tab.Screen
          name = {name}
          component={navigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <SFSymbol name={icon} size={size} color={color} />
            ),
          }}
        />
};