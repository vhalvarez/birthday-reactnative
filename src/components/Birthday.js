import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Birthday = ({birthday, deleteBirthday}) => {
    const pasat = birthday.days > 0 ? true : false;

    const InfoDay = () => {
        if (birthday.days === 0) {
            return <Text style={{color: '#fff'}}>Es su cumpleños</Text>;
        } else {
            const days = -birthday.days;

            return (
                <View style={styles.textCurrent}>
                    <Text>{days}</Text>
                    <Text>{days === 1 ? 'Dia' : 'Dias'}</Text>
                </View>
            );
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.card,
                pasat
                    ? styles.pasat
                    : birthday.days === 0
                    ? styles.actual
                    : styles.current,
            ]}
            onPress={() => deleteBirthday(birthday)}>
            <Text style={styles.userName}>
                {birthday.name} {birthday.lastname}
            </Text>
            {pasat ? <Text style={{color: '#fff'}}>Pasado</Text> : <InfoDay />}
        </TouchableOpacity>
    );
};

export default Birthday;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 10,
        margin: 16,
        borderRadius: 15,
    },
    pasat: {
        backgroundColor: '#820000',
    },
    current: {
        backgroundColor: '#dc28a6',
    },
    actual: {
        backgroundColor: '#559204',
    },
    userName: {
        color: '#fff',
        fontSize: 16,
    },
    textCurrent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
