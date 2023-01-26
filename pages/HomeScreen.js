import React from "react";
import styles from "../Stylesheet";
import {
    Text,
    View,
    ActivityIndicator,
    FlatList,
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import NoSchoolImage from "../components/NoSchoolImage";
import ItemDivider from "../components/ItemDivider";
import NavFooter from "../components/NavFooter";

export default function HomeScreen({ navigation, isLoading, title, footer, data }) {
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

            <NavFooter navigation={navigation}/>
            
          </View>
        )}
      </View>
    );
  }