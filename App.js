/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView, { Marker, Callout, ProviderPropType } from 'react-native-maps';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class App extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [
                {
                    coordinate: {
                        latitude: LATITUDE + SPACE,
                        longitude: LONGITUDE + SPACE,
                    },
                },
                {
                    coordinate: {
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                    },
                },
                {
                    coordinate: {
                        latitude: LATITUDE + SPACE,
                        longitude: LONGITUDE - SPACE,
                    },
                },
            ],
        };
    }

    show() {
        this.marker1.showCallout();
    }

    hide() {
        this.marker1.hideCallout();
    }

  render() {
      const { region, markers } = this.state;
    return (
      <View style={styles.container}>
          <MapView
              style={styles.map}
              initialRegion={region}
          >
              <Marker
                  ref={ref => { this.marker1 = ref; }}
                  coordinate={markers[0].coordinate}
                  title="This is a native view"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" // eslint-disable-line max-len
              />
              <Marker
                  coordinate={markers[1].coordinate}
              >
                  <Callout style={styles.plainView}>

                      <View>
                          <Text>This is a plain view</Text>
                      </View>
                  </Callout>
              </Marker>
              <Marker
                  coordinate={markers[2].coordinate}
                  calloutOffset={{ x: -8, y: 28 }}
                  calloutAnchor={{ x: 0.5, y: 0.4 }}
              >
                  <Callout tooltip style={styles.customView}>
                      <View style={{flexDirection: 'row'}}>
                          <Text style={{backgroundColor: 'blue'}}>1st Callout</Text>
                          <Text style={{backgroundColor: 'green'}}>2nd Callout</Text>
                      </View>
                  </Callout>
              </Marker>
          </MapView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    map: {
        width: "100%",
        height: "100%",
    },
});
