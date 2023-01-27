//the titan...

import React, {useState} from 'react';
import styles from "../Stylesheet";
import { View, Text, Pressable } from "react-native";
import { SFSymbol } from "react-native-sfsymbols";


import '../globalVar'



export default function NavFooter({ navigation }) {
    const [currentPage, setCurrentPage] = useState("Home") 
    const updatePage = (page) => setCurrentPage(page)
    return (
        
        <View style={styles.footer}>
                        <Pressable
                            style={styles.button}
                            onPress={() => [navigation.navigate("Home") && updatePage("Home")]}
                            children={({ pressed }) => (
                            <View style={styles.buttonBG}>
                                {currentPage == "Home" && <SFSymbol
                                    name="house.fill"
                                    weight=""
                                    scale="large"
                                    color="black" 
                                    size={15}
                                    resizeMode="center"
                                    multicolor={false}
                                    style={{ width: 32 }}
                                />}
                                {currentPage != "Home" && <SFSymbol
                                    name="house"
                                    weight=""
                                    scale="large"
                                    color="black" 
                                    size={15}
                                    resizeMode="center"
                                    multicolor={false}
                                    style={{ width: 32 }}
                                />}
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
                                { currentPage == "Lunch" && <SFSymbol
                                name="takeoutbag.and.cup.and.straw.fill"
                                weight=""
                                scale="large"
                                color="black"
                                size={15}
                                resizeMode="center"
                                multicolor={false}
                                style={{ width: 32, height: -2 }}
                                />}
                                {currentPage != "Lunch" && <SFSymbol
                                name="takeoutbag.and.cup.and.straw"
                                weight=""
                                scale="large"
                                color="black"
                                size={15}
                                resizeMode="center"
                                multicolor={false}
                                style={{ width: 32, height: -2 }}
                                />}
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
                            onPress={() => navigation.navigate("Account")}
                            children={({ pressed }) => (
                            <View>
                                {currentPage == "Account" && <SFSymbol
                                name="person.fill"
                                weight=""
                                scale="large"
                                color="black"
                                size={17}
                                resizeMode="center"
                                multicolor={false}
                                style={{ width: 60, height: -2 }}
                                />}
                                {currentPage != "Account" && <SFSymbol
                                name="person"
                                weight=""
                                scale="large"
                                color="black"
                                size={17}
                                resizeMode="center"
                                multicolor={false}
                                style={{ width: 60, height: -2 }}
                                />}
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
                                {currentPage =="Settings" && <SFSymbol
                                name="gearshape.fill"
                                weight=""
                                scale="large"
                                color="black"
                                size={16}
                                resizeMode="center"
                                multicolor={false}
                                style={{ width: 40 }}
                                />}
                                {currentPage !="Settings" && <SFSymbol
                                name="gearshape"
                                weight=""
                                scale="large"
                                color="black"
                                size={16}
                                resizeMode="center"
                                multicolor={false}
                                style={{ width: 40 }}
                                />}
                                <Text
                                style={{
                                    color: pressed ? onPress : "#222",
                                    paddingTop: 15,
                                    fontSize: 10,
                                    color: "#222",
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