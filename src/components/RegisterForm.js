import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';

export default function RegisterForm({changeForm}) {
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const register = () => {
        let errors = {};

        if (!formData.email || !formData.password || !formData.repeatPassword) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
            if (!formData.repeatPassword) errors.repeatPassword = true;
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
        } else if (formData.password !== formData.repeatPassword) {
            errors.password = true;
            errors.repeatPassword = true;
        } else if (formData.password.length < 6) {
            errors.password = true;
            errors.repeatPassword = true;
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    formData.email,
                    formData.password,
                )
                .then(() => {
                    console.log('Cuenta creada');
                })
                .catch(() => {
                    setFormError({
                        email: true,
                        password: true,
                        repeatPassword: true,
                    });
                });
        }

        setFormError(errors);
    };

    return (
        <>
            <TextInput
                style={[styles.input, formError.email && styles.error]}
                placeholder="Correo electronico"
                placeholderTextColor="#969696"
                onChange={e =>
                    setFormData({...formData, email: e.nativeEvent.text})
                }
            />

            <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                style={[styles.input, formError.password && styles.error]}
                secureTextEntry={true}
                onChange={e =>
                    setFormData({...formData, password: e.nativeEvent.text})
                }
            />

            <TextInput
                placeholder="Repetir Contraseña"
                placeholderTextColor="#969696"
                style={[styles.input, formError.repeatPassword && styles.error]}
                secureTextEntry={true}
                onChange={e =>
                    setFormData({
                        ...formData,
                        repeatPassword: e.nativeEvent.text,
                    })
                }
            />

            <TouchableOpacity onPress={register}>
                <Text style={styles.btnText}>Registrate</Text>
            </TouchableOpacity>

            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Iniciar sesion</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const defaultValue = () => {
    return {email: '', password: '', repeatPassword: ''};
};

const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontSize: 20,
    },
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

    login: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 28,
    },
    error: {
        borderColor: '#940C0C',
    },
});
