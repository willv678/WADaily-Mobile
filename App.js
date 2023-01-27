import React, { useState, useEffect, Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  Linking,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SFSymbol } from "react-native-sfsymbols";
import LinearGradient from "react-native-linear-gradient";
import Svg, { Circle, Line, SvgUri } from "react-native-svg";
//CSS Sheet
import styles from "./Stylesheet";
//Global variables
import './globalVar.js'
//Components
import LunchItems from "./components/LunchItems";
import LunchDivider from "./components/LunchDivider";
import NavFooter from "./components/NavFooter";
import NoSchoolImage from "./components/NoSchoolImage";
import ItemDivider from "./components/ItemDivider";



const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [JSON_DATA, setJSON_DATA] = useState("");

  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    fetchData();
    fetch(apiURL)
      .then((response) => response.json())
      .then((json) => {
        setData(json.schedule);
        setTitle(json.friendlyName);
        setDescription(json.description);
      })
      .catch((error) =>
        alert(
          "Unable to connect to WADaily servers \n Check Wi-Fi and try again shortly"
        )
      )
      .finally(() => setLoading(false));
  }, []);


  async function fetchData() {
    fetch(apiLunchURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setJSON_DATA(responseJson);
        setShowIndicator(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  //port this later, need to consult oracle about global variables like title
  var footer = "DEBUG ERROR";
  const Stack = createNativeStackNavigator();

  scheduleSuffix();

  function scheduleSuffix() {
    if (title == "No School Day") {
      footer = "";
    } else {
      footer = "Schedule";
    }
  }

  
  function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.scheduleArea}>
            <View
              style={{
                width: vWidth,
                height: "17.5%",
                borderRadius: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#fbbd25", "#ee4447", "#ec4897"]}
                style={styles.gradient}
              >
                <Text style={styles.aboveTitle}>Today is a</Text>
                <Text numberOfLines={1} style={styles.title}>
                  {title} {footer}
                </Text>
              </LinearGradient>
            </View>

            <View style={styles.timeArea}>
              <NoSchoolImage></NoSchoolImage>
              <FlatList
                data={data}
                scrollsToTop={true}
                bounces={true}
                /* Bounces is how u do the overscroll thing so idk ask some ppl if they want it */
                /** Guys i removed this
                 * idk if important but leaving here just in case ;)
                 * keyExtractor={({ id }, index) => id}
                 */
                ItemSeparatorComponent={ItemDivider}
                renderItem={({ item, index }) => (
                  <View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <View style={{ position: "absolute" }}>
                        <Svg height="100" width="50">
                          {index != 0 && (
                            <Line
                              x1="25"
                              y1="0"
                              x2="25"
                              y2="40"
                              stroke="#E9281F"
                              strokeWidth="2"
                            />
                          )}
                          <Circle cx="25" cy="40" r="6" fill="#E9281F" />
                          {index != data.length - 1 && (
                            <Line
                              x1="25"
                              y1="40"
                              x2="25"
                              y2="110"
                              stroke="#E9281F"
                              strokeWidth="2"
                            />
                          )}
                        </Svg>
                      </View>
                      <View>
                        <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                          <Text style={styles.periodName}>{item.name}</Text>
                          <Text style={styles.classTime}>
                            {item.startTime} to {item.endTime}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <NavFooter navigation={navigation} />
          </View>
        )}
      </View>
    );
  }
  function LunchScreen({ navigation }) {
    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.scheduleArea}>
            <View
              style={{
                width: vWidth,
                height: "17.5%",
                borderRadius: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#fbbd25", "#ee4447", "#ec4897"]}
                style={styles.gradient}
              >
                <Text style={styles.aboveTitle}>Viewing lunch for </Text>

                <Text style={styles.title}>{dateString}</Text>
              </LinearGradient>
            </View>

            <View style={styles.lunchArea}>
              <FlatList
                data={JSON_DATA}
                keyExtractor={(item, index) => {
                  return index.toString();
                }}
                renderItem={({ item }) => (
                  <View>
                    <LunchItems title={item.text} type={item.type} />
                  </View>
                )}
                ItemSeparatorComponent={LunchDivider}
              />
            </View>

            <NavFooter navigation={navigation}/>
          </View>
        )}
      </View>
    );
  }
  function SettingsScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: vWidth,
            height: "18.5%",
            borderRadius: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#fbbd25", "#ee4447", "#ec4897"]}
            style={styles.gradient}
          >
            <Pressable
              onPress={() => navigation.navigate("Home")}
              children={({ pressed }) => (
                <Text style={styles.settingsBackButton}>←</Text>
              )}
            />
            <Text style={styles.settingsTitle}>Settings</Text>
          </LinearGradient>
        </View>
        <Text>{"\n \n\n \n \n \n\n \n \n \n \n"}</Text>
        <Text>
          {" "}
          {"\n"}Made by Will Varner{"\n"}
        </Text>
        <Text
          style={{ color: "blue" }}
          onPress={() => Linking.openURL("https://wadaily.co/credits.html")}
        >
          View Credits @ WADaily.co {"\n"}
        </Text>
        <Text
          style={{ color: "blue" }}
          onPress={() => Linking.openURL("https://github.com/willv678/WADaily-Mobile")}
        >
          Check out the project on Github!
        </Text>

        <Text> {"\n"}Check back later for more features!</Text>

        <NavFooter navigation={navigation}/>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Lunch" component={LunchScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;