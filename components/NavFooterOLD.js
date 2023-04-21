//the titan...

import React, {useState} from 'react';
import styles from "../Stylesheet";
import { View, Text, Pressable } from "react-native";
import { SFSymbol } from "react-native-sfsymbols";
import '../globalVar'
import { useNavigationContainerRef } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';



export default function NavFooter() {
    const [currentPage, setCurrentPage] = useState("Home");

    return (
        
        <View style={styles.footer}>
                        <NavButton name={"Home"} icon={"house.fill"}currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        <NavButton name={"Lunch"} icon={"fork.knife.circle"} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        <NavButton name={"Options"} icon={"gearshape"} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </View>
    );
    
    function NavButton({name, icon, destination, onPress, currentPage, style, children, ...props}) {
        const navigator = useNavigationContainerRef();
        
        return <Pressable
            style={styles.button}
            onPress={() => {
                console.log("Pressed " + name);
                navigator.navigate(name);
            } }
            children={({ pressed }) => (
                <View style={styles.buttonBG}>
                    {currentPage == "Home" && <SFSymbol
                        name = {icon}
                        weight=""
                        scale="large"
                        color="black"
                        size={15}
                        resizeMode="center"
                        multicolor={false}
                        style={{ width: 32 }} />}
                    {currentPage != "Home" && <SFSymbol
                        name="house"
                        weight=""
                        scale="large"
                        color="black"
                        size={15}
                        resizeMode="center"
                        multicolor={false}
                        style={{ width: 32 }} />}
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
            )} />;
    }
  }
  //*/}