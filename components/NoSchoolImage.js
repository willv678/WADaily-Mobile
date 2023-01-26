export default function NoSchoolImage({ navigation , title}) {
    if (title == "No School Day") {
              return (
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    { alignItems: "center", justifyContent: "center" },
                  ]}
                >
                  <SvgUri
                    width="260"
                    height="185"
                    uri="https://wadaily.co/booked.svg"
                  />
                  <Text style={styles.noSchoolText}>No school today!</Text>
                  <Text>Enjoy your day off or check out another day</Text>
                </View>
              );
    }
};