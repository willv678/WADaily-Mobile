export class BottomFooter extends Component {
    render() {
      return (
        <View style = {styles.footer}>
                    
                    
                    <View style = {styles.button}>

                      <Pressable onPress={() => navigation.navigate('Home')}
                          children={({ pressed }) => (
                            <SFSymbol
                            name="house.fill"
                            weight=""
                            scale="large"
                            color="black"
                            size={20}
                            resizeMode="center"
                            multicolor={false}
                            style={{ width: 32,}}
                          /> 
                        )}/>
                        <Pressable onPress={() => navigation.navigate('Home')}
                          children={({ pressed }) => (
                          <Text style={{ color: pressed ? onPress : '#222', paddingTop: 15,}}>
                            Home
                          </Text>
                        )}/>
                      </View>
                      <View style = {styles.button}>
                            <Text>   </Text>
                      </View>
                      <View style = {styles.centerButton}>
                    
                        <Pressable onPress={() => navigation.navigate('Lunch')}
                          children={({ pressed }) => (
                          
                          
                            <SFSymbol
                              name="takeoutbag.and.cup.and.straw"
                              weight=""
                              scale="large"
                              color="black"
                              size={20}
                              resizeMode="center"
                              multicolor={false}
                              style={{ width: 32, height: -2,}}
                            /> 
                          
                        )}/>
                        <Pressable onPress={() => navigation.navigate('Lunch')}
                          children={({ pressed }) => (
                          <Text style={{ color: pressed ? onPress : '#222', paddingTop: 15,}}>
                            Lunch
                          </Text>
                        )}/>
                      </View>
                      
                      <View style = {styles.button}>
                            <Text>   </Text>
                      </View>
                      
                      <View style = {styles.button}>
                    
                        <Pressable onPress={() => navigation.navigate('Settings')}
                          children={({ pressed }) => (
                          
                            <SFSymbol
                            name="gearshape"
                            weight=""
                            scale="large"
                            color="black"
                            size={20}
                            resizeMode="center"
                            multicolor={false}
                            style={{ width: 32,}}
                            /> 
                        )}/>
                        <Pressable onPress={() => navigation.navigate('Settings')}
                          children={({ pressed }) => (
                          <Text style={{ color: pressed ? onPress : '#222', paddingTop: 15,}}>
                            More
                          </Text>
                        )}/>
                      </View>   
        </View>  
    
      );
    }
  }


