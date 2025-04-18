import React, {useState} from 'react';
import {
    Text,
    TextInput,
    View,
    Button,
    Alert,
} from 'react-native';

const App = () => {
    const [number, onChangeNumber] = useState('');

    const handleSubmit = () => {
        // Do something with the number input
        // For example, show an alert
        Alert.alert('Submitted value', `You entered: ${number}`);

        // You could also send it to a server, log it, clear it, etc.
        // onChangeNumber(''); // Uncomment to clear input after submit
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#121212',
            }}>
            <Text style={{ color: 'white', marginBottom: 10 }}>Input Transaction</Text>
            <TextInput
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Enter amount"
                keyboardType="numeric"
                style={{
                    color: 'white',
                    borderColor: 'gray',
                    borderWidth: 1,
                    padding: 10,
                    width: 200,
                    marginBottom: 10,
                }}
                placeholderTextColor="#888"
            />
            <Button
                title="Submit"
                onPress={handleSubmit}
            />
        </View>
    );
};

export default App;
