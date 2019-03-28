/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import MapView, {Marker, Callout, ProviderPropType, PROVIDER_GOOGLE} from 'react-native-maps';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class App extends Component<Props> {
    showPopup = false;
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

    _centerAllMarkers = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Marker was clicked");
    };

    recordEvent(name) {
        return e => {
            if (e.persist) {
                e.persist();
            }
            //console.log("Event:", name);
            // e.preventDefault();
            // e.stopImmediatePropagation()
        };
    }


    render() {
        const {region, markers} = this.state;
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    moveOnMarkerPress={true}
                    style={styles.map}
                    initialRegion={region}
                    onRegionChange={this.recordEvent('Map::onRegionChange')}
                    onRegionChangeComplete={this.recordEvent('Map::onRegionChangeComplete')}
                    onPress={this.recordEvent('Map::onPress')}
                    onPanDrag={this.recordEvent('Map::onPanDrag')}
                    onLongPress={this.recordEvent('Map::onLongPress')}
                    onMarkerPress={(event) => this._centerAllMarkers(event)}
                    onMarkerSelect={this.recordEvent('Map::onMarkerSelect')}
                    onMarkerDeselect={this.recordEvent('Map::onMarkerDeselect')}
                    onCalloutPress={this.recordEvent('Map::onCalloutPress')}

                >
                    <Marker
                        ref={ref => {
                            this.marker1 = ref;
                        }}
                        stopPropagation={true}
                        coordinate={markers[0].coordinate}
                        title="This is a native view"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" // eslint-disable-line max-len
                    />
                    <Marker
                        coordinate={markers[1].coordinate}
                    >
                        <Callout style={styles.plainView}>

                        </Callout>
                    </Marker>
                </MapView>
                <View style={styles.buttonContainer}>
                    <View style={styles.bubble}>
                        <Text>Tap on markers to see different callouts</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.show()} style={[styles.bubble, styles.button]}>
                        <Text>Show</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.hide()} style={[styles.bubble, styles.button]}>
                        <Text>Hide</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
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
        ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});
