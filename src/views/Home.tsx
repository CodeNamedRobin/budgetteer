// screens/Home.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import {database} from '../model';
import Transaction from '../model/Transaction.ts';

const Home = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const fetchTransactions = async () => {
        const collection = database.get<Transaction>('transactions');
        const allTransactions = await collection.query().fetch();
        setTransactions(allTransactions);
    };

    const addTransaction = async () => {
        if (!amount || !description) {return;}

        await database.write(async () => {
            await database.get<Transaction>('transactions').create(tx => {
                tx.amount = Number(amount);
                tx.description = description;
                tx.createdAt = new Date();
            });
        });

        setAmount('');
        setDescription('');
        fetchTransactions();
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Ledger</Text>

            <TextInput
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <Button title="Add Transaction" onPress={addTransaction} />

            <FlatList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.transaction}>
                        <Text>{item.description}</Text>
                        <Text>{item.amount} €</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#121212',
    },
    header: {
        fontSize: 24,
        color: 'white',
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    transaction: {
        padding: 12,
        backgroundColor: '#222',
        marginVertical: 6,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
