import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { createTable, insertTransaction, getAllTransactions } from '../controllers/transaction.controller';
import { Transaction } from '../models/transaction.model';

const Home = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    useEffect(() => {
        createTable();
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        const data = await getAllTransactions();
        setTransactions(data);
    };

    const handleSubmit = async () => {
        if (!amount || !description) {return;}

        await insertTransaction({
            amount: parseFloat(amount),
            description,
            date: new Date().toISOString(),
        });

        setAmount('');
        setDescription('');
        loadTransactions();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Transaction</Text>
            <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <Button title="Save" onPress={handleSubmit} />
            <FlatList
                data={transactions}
                keyExtractor={item => item.id?.toString() ?? ''}
                renderItem={({ item }) => (
                    <Text style={styles.item}>
                        {item.date.split('T')[0]} - €{item.amount.toFixed(2)} ({item.description})
                    </Text>
                )}
                style={{ marginTop: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#121212' },
    header: { color: 'white', fontSize: 20, marginBottom: 10 },
    input: {
        backgroundColor: '#1e1e1e',
        color: 'white',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    item: { color: 'white', marginBottom: 5 },
});

export default Home;
