//the titan...

import React from 'react';
import styles from "../Stylesheet";
import { View, Text, Pressable } from "react-native";
import { SFSymbol } from "react-native-sfsymbols";


import '../globalVar'


export default function NavFooter({ navigation }) {
    return (
            <View style={styles.footer}>
                        <View style={styles.button}>
                            <Pressable
                            onPress={() => navigation.navigate("Home")}
                            children={({ pressed }) => (
                                <SFSymbol
                                name="house.fill"
                                weight=""
                                scale="large"
                                color="black"
                                size={20}
                                resizeMode="center"
                                multicolor={false}
                                style={{ width: 32 }}
                                />
                            )}
                            />
                            <Pressable
                            onPress={() => navigation.navigate("Home")}
                            children={({ pressed }) => (
                                <Text
                                style={{
                                    color: pressed ? onPress : "#222",
                                    paddingTop: 15,
                                }}
                                >
                                Home
                                </Text>
                            )}
                            />
                        </View>

                        <View style={styles.centerButton}>
                            <Pressable
                            onPress={() => navigation.navigate("Lunch")}
                            children={({ pressed }) => (
                                <SFSymbol
                                name="takeoutbag.and.cup.and.straw"
                                weight=""
                                scale="large"
                                color="black"
                                size={20}
                                resizeMode="center"
                                multicolor={false}
                                style={{ width: 32, height: -2 }}
                                />
                            )}
                            />
                            <Pressable
                            onPress={() => navigation.navigate("Lunch")}
                            children={({ pressed }) => (
                                <Text
                                style={{
                                    color: pressed ? onPress : "#222",
                                    paddingTop: 15,
                                }}
                                >
                                Lunch
                                </Text>
                            )}
                            />
                        </View>

                        <View style={styles.button}>
                            <Pressable
                            onPress={() => navigation.navigate("Settings")}
                            children={({ pressed }) => (
                                <SFSymbol
                                name="gearshape"
                                weight=""
                                scale="large"
                                color="black"
                                size={20}
                                resizeMode="center"
                                multicolor={false}
                                style={{ width: 32 }}
                                />
                            )}
                            />
                            <Pressable
                            onPress={() => navigation.navigate("Settings")}
                            children={({ pressed }) => (
                                <Text
                                style={{
                                    color: pressed ? onPress : "#222",
                                    paddingTop: 15,
                                }}
                                >
                                More
                                </Text>
                            )}
                            />
                        </View>
                        </View>
    );
  }