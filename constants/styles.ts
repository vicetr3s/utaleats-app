export const COLORS = {
    primary: '#F03E41',
    secondary: '#FEBEC4',
    accent: '#FB9733',
    background: '#FFFFFF',
    base: '#FBFBFB',
    baseDk: '#F2F2F2',
    baseDkr:'#E5E5E5',
    shadow: '#3e3e3e',
    fntOverPrimary: '#ffffff',
}

export const MISC = {
    borderRadius: 12,
    borderInnerRadius: 8,
    containerPadding: 24,
    midIconSize: 24,
    largeIconSize: 32,
    smallIconSize: 18,
}

export const LIB = {
    container: {
        minWidth: 300,
        padding: MISC.containerPadding,
        backgroundColor: COLORS.base,
        borderRadius: MISC.borderRadius,
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    textField: {
        backgroundColor: COLORS.baseDk,
        borderRadius: MISC.borderInnerRadius,
        borderColor: COLORS.baseDkr,
        borderWidth: 1,
    }
}