import React, { useState, useEffect, Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  Linking,
  Dimensions,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SFSymbol } from "react-native-sfsymbols";

import { BottomFooter } from "./Footer";
import styles from "./styles";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LinearGradient from "react-native-linear-gradient";
import Svg, { Circle, Line, SvgUri } from "react-native-svg";
import {NoSchoolImage} from './components/NoSchoolImage'

// GEORGE PARKS I LOVE URL!
const debugURL = "https://wadaily.co/api/schedule?date=9-2-22";
const apiURL = "https://wadaily.co/api/schedule";
const vWidth = Dimensions.get("window").width;

const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const dateObj = new Date();
const date = dateObj.getDate();
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
][dateObj.getMonth()];
const year = dateObj.getFullYear();

var dateString = month + " " + date + nth(date);
let numDate =
  parseInt(dateObj.getMonth() + 1) +
  "-" +
  dateObj.getDate() +
  "-" +
  dateObj.getFullYear();
const lunchWeb = "https://wadaily.co/api/lunchList?date=";
const apiLunchURL = lunchWeb + numDate;
const fakeLunchURL = "https://wadaily.co/api/lunchList?date=8-19-22";

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
  const Item = ({ title, type }) => (
    <View style={styles.listItem}>
      <Text style={type === "entry" ? styles.lunchItems : styles.lunchTitle}>
        {title}{" "}
      </Text>
    </View>
  );

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
  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "60%",
          marginLeft: "12.5%",
          backgroundColor: offWhite,
        }}
      />
    );
  };
  const LunchDivider = () => {
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
              <NoSchoolImage title={title}></NoSchoolImage>
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
              <View style={styles.button}>
                <Text> </Text>
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
                <Text> </Text>
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
                    <Item title={item.text} type={item.type} />
                  </View>
                )}
                ItemSeparatorComponent={LunchDivider}
              />
            </View>

            <View style={styles.footer}>
              <View style={styles.button}>
                <Pressable
                  onPress={() => navigation.navigate("Home")}
                  children={({ pressed }) => (
                    <SFSymbol
                      name="house"
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
              <View style={styles.button}>
                <Text> </Text>
              </View>
              <View style={styles.centerButton}>
                <Pressable
                  onPress={() => navigation.navigate("Lunch")}
                  children={({ pressed }) => (
                    <SFSymbol
                      name="takeoutbag.and.cup.and.straw.fill"
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
                <Text> </Text>
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
            height: "10%",
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
        <Text>{"\n \n\n \n \n \n\n \n \n \n \n \n \n \n \n"}</Text>
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

        <View style={styles.footer}>
          <View style={styles.button}>
            <Pressable
              onPress={() => navigation.navigate("Home")}
              children={({ pressed }) => (
                <SFSymbol
                  name="house"
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
                  style={{ color: pressed ? onPress : "#222", paddingTop: 15 }}
                >
                  Home
                </Text>
              )}
            />
          </View>
          <View style={styles.button}>
            <Text> </Text>
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
                  style={{ color: pressed ? onPress : "#222", paddingTop: 15 }}
                >
                  Lunch
                </Text>
              )}
            />
          </View>

          <View style={styles.button}>
            <Text> </Text>
          </View>

          <View style={styles.button}>
            <Pressable
              onPress={() => navigation.navigate("Settings")}
              children={({ pressed }) => (
                <SFSymbol
                  name="gearshape.fill"
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
                  style={{ color: pressed ? onPress : "#222", paddingTop: 15 }}
                >
                  More
                </Text>
              )}
            />
          </View>
        </View>
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
