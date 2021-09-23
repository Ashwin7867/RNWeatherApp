/*jshint esversion: 6 */
import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, ImageBackground, ActivityIndicator } from 'react-native';
import getImageSouce from './utils/getImageSouce';
import SearchInput from './components/SearchInput';
import { fetchLocationId, fetchWeather } from './utils/api';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, error: false, city: ' ', weather: ' ', temperature: 0 };
  }
  componentDidMount() {
    this.handleSubmit('New Delhi');
  }
  handleSubmit = async city => {
    this.setState({ loading: true }, async () => {
      try {
        const woeid = await fetchLocationId(city);
        const { location, temperature, climate } = await fetchWeather(woeid);
        this.setState({
          loading: false,
          error: false,
          city: location,
          weather: climate,
          temperature: temperature
        })
      }
      catch (e) {
        this.setState({
          loading: false, error: true
        })
      }
    })
  }
  render() {
    const loading = this.state.loading;
    const error = this.state.error;
    return (
      <KeyboardAvoidingView style={styles.container} behaviour='padding'>
        <ImageBackground source={getImageSouce(this.state.weather)}
          style={styles.imageStyle}
          imageStyle={styles.image}>
          <ActivityIndicator animating={loading} color="green" size="large" />
          <View style={styles.detailscontainer}>
            {!loading && (
              <View>
                {error && (
                  <Text>This city was not found in database</Text>
                )}
                {!error && (
                  <View>
                    <Text style={[styles.inputtext, styles.largetext]}>{this.state.city}</Text>
                    <Text style={[styles.inputtext, styles.smalltext]}>{this.state.weather}</Text>
                    <Text style={[styles.inputtext, styles.largetext]}>{Math.round(this.state.temperature)}°</Text>
                  </View>
                )}
              </View>
            )}
            <SearchInput placeholder='type name of city'
              onTextSubmit={this.handleSubmit} />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  imageStyle: { flex: 1 },
  image: { flex: 1, width: null, height: null, resizeMode: 'cover' },
  inputtext: { textAlign: 'center', fontFamily: 'Roboto' },
  largetext: {
    fontSize: 44
  },
  smalltext: { fontSize: 22 },
  detailscontainer: { flex: 1, justifyContent: 'center', alignItems: 'center', color: 'blue' }
});
