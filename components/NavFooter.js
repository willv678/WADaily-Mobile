//the titan...

import React from 'react';
import styles from "../Stylesheet";
import { View, Text, Pressable } from "react-native";
import { SFSymbol } from "react-native-sfsymbols";


import '../globalVar'

export default function NavFooter({ navigation }) {
    return (
        <View style={styles.footer}>
                        <Pressable
                            style={styles.button}
                            onPress={() => navigation.navigate("Home")}
                            children={({ pressed }) => (
                                <View style={styles.buttonBG}>
                                <SFSymbol
                                name="house.fill"
                                weight=""
                                scale="large"
                                color="black"
                                size={15}
                                resizeMode="center"
                                multicolor={false}
                                style={{ width: 32 }}
                                />
                                <Text
                                style={{
                                    color: pressed ? onPress : "#222",
                                    paddingTop: 15,
                                    fontSize: 10,
                                    textAlign: "center",
                                }}
                                >
                                Home
                                </Text>
                                </View>
                            )}
                        />

                        
                        <Pressable
                            style={[styles.centerButton, styles.button]}
                            onPress={() => navigation.navigate("Lunch")}
                            children={({ pressed }) => (
                            <View>
                                <SFSymbol
                                name="takeoutbag.and.cup.and.straw"
                                weight=""
                                scale="large"
                                color="black"
                                size={15}
                                resizeMode="center"
                                multicolor={false}
                                style={{ width: 32, height: -2 }}
                                />
                                <Text
                                style={{
                                    color: pressed ? onPress : "#222",
                                    paddingTop: 15,
                                    fontSize: 10,
                                    textAlign: "center",
                                }}
                                >
                                Lunch
                                </Text>
                            </View>
                            )}
                        />
                        <Pressable
                            style={[styles.centerButton, styles.button]}
                            onPress={() => navigation.navigate("Lunch")}
                            children={({ pressed }) => (
                            <View>
                                <SFSymbol
                                name="person"
                                weight=""
                                scale="large"
                                color="black"
                                size={17}
                                resizeMode="center"
                                multicolor={false}
                                style={{ width: 60, height: -2 }}
                                />
                                <Text
                                style={{
                                    color: pressed ? onPress : "#222",
                                    paddingTop: 15,
                                    fontSize: 10,
                                    textAlign: "center",
                                }}
                                >
                                Account
                                </Text>
                            </View>
                            )}
                        />
                        <Pressable
                            style={styles.button}
                            onPress={() => navigation.navigate("Settings")}
                            children={({ pressed }) => (
                            <View>
                                <SFSymbol
                                name="gearshape"
                                weight=""
                                scale="large"
                                color="black"
                                size={15}
                                resizeMode="center"
                                multicolor={false}
                                style={{ width: 40 }}
                                />
                                <Text
                                style={{
                                    color: pressed ? onPress : "#222",
                                    paddingTop: 15,
                                    fontSize: 10,
                                    textAlign: "center",
                                }}
                                >
                                More
                                </Text>
                            </View>
                            )}
                        />
                    </View>
    );
  }
  //*/}