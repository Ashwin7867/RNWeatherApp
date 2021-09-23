/*jshint esversion: 6 */
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export default class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }
    handleChangeText = (text) => (
        this.setState({ text: text })
    )
    handleSubmit = () => {
        this.props.onTextSubmit(this.state.text);
        this.setState({ text: '' });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={this.props.placeholder}
                    style={styles.inputstyle}
                    value={this.state.text}
                    onChangeText={this.handleChangeText}
                    onSubmitEditing={this.handleSubmit}
                    clearButtonMode='always' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width : 300,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5, alignItems: 'center'
    },
    inputstyle: { flex: 1, color: 'white' }
})
