const colors = {
    primary: '#6200ee',
    primaryVariant: '#3700b3',
    secondary: '#03dac6',
    background: '#cacaca',
    surface: '#ffffff',
    error: '#b00020',
    onPrimary: '#ffffff',
    onSecondary: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    onError: '#ffffff',
    border: 'gray',
    disabled: 'lightgray'
  };

export const lightTheme = {
    body: '#FFF',
    text: '#000',
    toggleBorder: '#FFF',
    borderTiny: '.5px solid gray',
    colors
}

export const darkTheme = {
    body: '#363537',
    text: '#fafafa',
    toggleBorder: '#6B8096',
    borderTiny: '.5px solid aliceblue',
    colors: {
        ...colors,
        background: '#121212',
        surface: '#333',
        onBackground: '#ffffff',
        onSurface: '#ffffff',
        border: 'aliceblue',
        disabled: 'darkgrey'
    }
}

export type Theme = (typeof lightTheme) | (typeof darkTheme);