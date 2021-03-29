import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';

export default function LoginForm({changeForm}) {
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const login = () => {
        let errors = {};

        if (!formData.email || !formData.password) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
            console.log('Error #1');
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
            console.log('Error #2');
        } else {
            //Logica para el login
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    console.log('ok');
                })
                .catch(() => {
                    setFormError({
                        email: true,
                        password: true
                    });
                });
        }
        setFormError(errors);
    };

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text});
    };

    return (
        <>
            <TextInput
                placeholder="Correo electronico"
                placeholderTextColor="#969696"
                style={[styles.input, formError.email && styles.error]}
                onChange={e => onChange(e, 'email')}
            />

            <TextInput
                placeholder="Password"
                placeholderTextColor="#969696"
                style={[styles.input, formError.password && styles.error]}
                secureTextEntry={true}
                onChange={e => onChange(e, 'password')}
            />

            <TouchableOpacity onPress={login}>
                <Text style={styles.btnText}>Iniciar sesion</Text>
            </TouchableOpacity>

            <View style={styles.register}>
                <TouchableOpacity>
                    <Text onPress={changeForm} style={styles.btnText}>
                        Registrate
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const defaultValue = () => {
    return {
        email: '',
        password: '',
    };
};

const styles = StyleSheet.create({
    input: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040',
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
    },
    register: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 28,
    },
    error: {
        borderColor: '#940C0C',
    },
});
