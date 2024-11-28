import {StyleSheet} from 'react-native';

export const COLORS = {
    primary: '#F03E41',
    secondary: '#FEBEC4',
    accent: '#FB9733',
    background: '#FFFFFF',
    base: '#FBFBFB',
    baseDk: '#F2F2F2',
    baseDkr: '#E5E5E5',
    shadow: '#3e3e3e',
    fntOverPrimary: '#ffffff',
    placeHolderText: '#676767',
}

export const MISC = {
    borderRadius: 12,
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
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
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