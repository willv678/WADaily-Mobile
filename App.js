import React, { useState, useEffect, } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

// GEORGE PARKS I LOVE URL!

const apiURL = "https://wadaily.co/api/schedule";
const wadailyRed = "#E9281F"
const wadailyOffRed ="#FFFFF"
const offWhite = "#f3f2f8"
const onPress = '#89898c'
const buttonFontSize = 18



const nth = function(d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
  }
};

const dateObj = new Date();
const date = dateObj.getDate();
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][dateObj.getMonth()];
const year = dateObj.getFullYear();

var dateString = month + " " + date+nth(date);
let numDate= parseInt(dateObj.getMonth()+1) + "-" + dateObj.getDate()+"-"+dateObj.getFullYear();
const lunchWeb = "https://wadaily.co/api/lunchList?date="
const apiLunchURL = lunchWeb + numDate
const fakeLunchURL = "https://wadaily.co/api/lunchList?date=8-19-22"

const App = () => {
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [JSON_DATA, setJSON_DATA] = useState('');

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
      .catch((error) => alert(error)) 
      .finally(() => setLoading(false)); 
  }, []);
  const ItemRender = ({ title, type }) => (
    <View style={styles.listItem}>
      <Text style={type === 'entry' ? styles.lunchItems : styles.lunchTitle}>{title} </Text>
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
          marginLeft: '12.5%',
          backgroundColor: offWhite,
        }}
      />
    );
  }
  const LunchDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          marginTop: '1.5%',
          marginBottom: '1.5%',
          marginLeft: '7.5%',
          backgroundColor: offWhite,
        }}
      />
    );
  }
  const Stack = createNativeStackNavigator();
  async function getMoviesAsync() {
    try {
      let response = await fetch(apiURL);
      let json = await response.json();
      setData(json.movies);
      setTitle(json.title);
      setDescription(json.description);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }
  
  
  
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
            
            {isLoading ? (
              <ActivityIndicator/>
            ) : (
              
              <View style={styles.scheduleArea}>


                <View style={{width:400, height: '17.5%', borderRadius: 0, alignItems: 'center', justifyContent: 'center'}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#fbbd25', '#ee4447', '#ec4897']} style={styles.gradient}>
                    <Text style={styles.aboveTitle}>Today is a</Text>
                    <Text numberOfLines={1} style={styles.title}>{title} Schedule</Text>
                  </LinearGradient>
                </View>
                
                
                  
                  <View style ={styles.timeArea}>
                    <FlatList 
                      data={data}
                      scrollsToTop={false}
                      keyExtractor={({ id }, index) => id}
                      ItemSeparatorComponent={ItemDivider}
                      renderItem={({ item }) => (
                        <View style={{ paddingBottom: 10, paddingTop: 10,}}>
                          <Text style={styles.periodName}>
                            {item.name}
                          </Text>
                          <Text style={styles.classTime}>
                            {item.startTime} to {item.endTime}
                          </Text>
                        </View>
                      )}
                    />
                    

                  </View>
                  <View style = {styles.footer}>
                    <View style = {styles.button}>

                      <Pressable
                        children={({ pressed }) => (
                        <Text style={{ color: pressed ? onPress : '#222', fontSize: 25}}>
                          🗓️ 
                        </Text>
                      )}/>
                      <Pressable 
                        children={({ pressed }) => (
                        <Text style={{ color: pressed ? onPress : '#222'}}>
                          Schedule
                        </Text>
                      )}/>
                    </View>
                    <View style = {styles.button}>
                          <Text>   </Text>
                    </View>
                    <View style = {styles.button}>
                  
                      <Pressable onPress={() => navigation.navigate('Lunch')}
                        children={({ pressed }) => (
                        
                        <Text style={{ color: pressed ? onPress : '#222', fontSize: 25}}>
                          🍱 
                        </Text>
                      )}/>
                      <Pressable onPress={() => navigation.navigate('Lunch')}
                        children={({ pressed }) => (
                        <Text style={{ color: pressed ? onPress : '#222'}}>
                          Lunch
                        </Text>
                      )}/>
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
              <ActivityIndicator/>
            ) : (
              
              <View style={styles.scheduleArea}>


                
                <View style={{width:400, height: '17.5%', borderRadius: 0, alignItems: 'center', justifyContent: 'center'}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#fbbd25', '#ee4447', '#ec4897']} style={styles.gradient}>
                <Text style={styles.aboveTitle}>Viewing lunch for </Text>
                  
                  <Text style={styles.title}>{dateString}</Text>
                  </LinearGradient>
                </View>
                
                  
                  <View style ={styles.lunchArea}>
                    <FlatList
                      data={JSON_DATA}
                      
                      renderItem={({ item }) => (  
                        <View>
                               <ItemRender title={item.text} type={item.type} />
                        </View>
                      )}
                      ItemSeparatorComponent={LunchDivider}
                      keyExtractor={item => item.id}

                    />
                  </View>
                
                  <View style = {styles.footer}>
                    <View style = {styles.button}>

                      <Pressable  onPress={() => navigation.goBack()}
                        children={({ pressed }) => (
                        <Text style={{ color: pressed ? onPress : '#222', fontSize: 25}}>
                          🗓️
                        </Text>
                      )}/>
                      <Pressable onPress={() => navigation.goBack()}
                        children={({ pressed }) => (
                        <Text style={{ color: pressed ? onPress : '#222'}}>
                          Schedule
                        </Text>
                      )}/>
                    </View>
                    <View style = {styles.button}>
                          <Text>   </Text>
                    </View>
                    <View style = {styles.button}>
                  
                      <Pressable onPress={() => navigation.navigate('Lunch')}
                        children={({ pressed }) => (
                        
                        <Text style={{ color: pressed ? onPress : '#222', fontSize: 25}}>
                          🍱 
                        </Text>
                      )}/>
                      <Pressable onPress={() => navigation.navigate('Lunch')}
                        children={({ pressed }) => (
                        <Text style={{ color: pressed ? onPress : '#222'}}>
                          Lunch
                        </Text>
                      )}/>
                    </View>
                    
                  </View>  
              </View>
            )}
            
          </View>

  );
}

  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Home" 
      screenOptions={{
      headerShown: false
  }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Lunch" component={LunchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 0,

    
  },
  gradient:{
    flex: 1,
    paddingLeft: 200,
    paddingRight: 200,
    borderRadius: 0,
    
  },

  aboveTitle: {
    fontSize: 23,
    position: 'absolute',
    top: '40%',
    left: '10%',
    fontWeight: "400",
    color: 'white',
    paddingLeft: 30,
  },
  title: {
    fontSize: 43,
    fontWeight: "bold",
    position: 'absolute',
    paddingLeft: 30,
    top: '55%',
    left: '1%',
    color: 'white',
    marginRight: '0%',
    

  },
  description: {
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "200",
    
    color: "green",
  },

  leftBar:{
    backgroundColor: offWhite, 
    position: "absolute", 
    left: '0%', 
    top: '15%', 
    width:25, 
    height: '100%', 
    borderRadius: 0, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  rightBar:{
    backgroundColor: offWhite, 
    position: "absolute", 
    right: '0%', 
    top: '15%', 
    width:25, 
    height: '100%', 
    borderRadius: 0, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  scheduleArea: {
    marginBottom: '20%',
    backgroundColor: 'white',

  },
  timeArea: {
    marginBottom: '70%',
    
  } ,
  lunchArea: {
    paddingBottom: 280,
    paddingTop: 0,
    alignItems: 'center', 
    justifyContent: 'center',
  },

  periodName: {
    fontSize: 32,
    fontWeight: "600",
    color: "#384050",
    
    alignItems: 'center', 
    justifyContent: 'center',
    
    marginRight: '15%',
    marginLeft: '12.5%',
  },
  classTime: {
    fontSize: 26,
    fontWeight: "400",
    color: "#384050",
    alignItems: 'center', 
    justifyContent: 'center',
    marginRight: '10%',
    marginLeft: '12%',
  

  },
  lunchTitle: {
    fontSize: 32,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: "#384050",
    marginRight: '10%',
    marginLeft: '5%',
    marginTop: '5%',
  },
  lunchItems: {
    fontSize: 26,
    fontWeight: "400",
    color: "#384050",
    alignItems: 'center', 
    justifyContent: 'center',
    marginRight: '5%',
    marginLeft: '5%',
    
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  button: {

    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 5,

    
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',

  },
  footer: {
    flex: 1,
    flexDirection:"row",
    alignItems: 'baseline',
    justifyContent: 'center',
    position: "absolute",
    marginTop: '196%',
    marginLeft: 5,
    width:'100%', 
    height: 100,
    backgroundColor: "#FFFF",
    borderTopColor: offWhite,
    borderTopWidth: 2,
    

  },
});





export default App;

