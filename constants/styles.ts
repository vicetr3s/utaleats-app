import {StyleSheet} from 'react-native';

export const COLORS = {
    primary: '#F03E41',
    secondary: '#FEBEC4',
    red: '#C12124',
    background: '#FFFFFF',
    base: '#FBFBFB',
    baseDk: '#F2F2F2',
    baseDkr: '#E5E5E5',
    baseDkrr: '#cacaca',
    baseDks: '#A4A4A4',
    shadow: 'rgba(181,181,181,0.47)',
    fntOverPrimary: '#ffffff',
    placeHolderText: '#676767',
}

export const MISC = {
    borderRadius: 12,
    borderRounderRadius: 24,
    borderInnerRadius: 8,
    midIconSize: 24,
    largeIconSize: 32,
    smallIconSize: 18,
    smallFontSize: 14,
    midFontSize: 16,
    largeFontSize: 18,
    largerFontSize: 24,
}

export const LIB = StyleSheet.create({
    shadow: {
        boxShadow: '0 3 5 3 rgba(181,181,181,0.47)',
    },
    insetShadow: {
        boxShadow: 'inset 0 3 5 3 rgba(181,181,181,0.47)',
    },
    container: {
        minWidth: 300,
        padding: 24,
        backgroundColor: COLORS.base,
        borderRadius: MISC.borderRadius,
    },
    h1: {
        fontSize: 34,
        fontWeight: 500,
        textAlign: 'center',
    },
    h2: {
        fontSize: 26,
        fontWeight: 500,
        textAlign: 'center',
    },
    h3: {
        fontSize: 20,
        textAlign: 'center',
    }
})