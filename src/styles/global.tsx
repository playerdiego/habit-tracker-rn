import { StyleSheet } from "react-native";

export const globalColors = {
    primary: '#000',
    secondary: '#fff',
    background: '#fff',
    red: '#AF2413',
    green: '#57F287',
    yellow: '#FFEB00',
    gray: '#cdcdcd'
}

export const global = StyleSheet.create({
    text: {
        fontFamily: 'Roboto_400Regular',
    },
    title: {
        fontFamily: 'Comfortaa_400Regular',
    },
    container: {
        padding: 20
    },
    input: {
        borderWidth: 2,
        borderColor: globalColors.primary,
        padding: 8,
        borderRadius: 4,
        marginVertical: 8
    },
    boldTitle: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 12
    },
    checkbox: {
        borderRadius: 4
    }
});