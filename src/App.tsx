import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';
import { GlobalStyles } from './global';
import { Select } from './components/select/select';

const App: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    const t = theme === 'light' ? lightTheme : darkTheme;
    return (

        <ThemeProvider theme={t}>
            <>
                <GlobalStyles theme={t}/>
                <button onClick={toggleTheme}>Toggle theme</button>
                <br />
                <br />
                <Select
                    title="Select a option"
                    options={[
                        {
                            value: 1,
                            text: 'Option 1',
                        },
                        {
                            value: 2,
                            text: 'Option 2',
                        },
                        {
                            value: 3,
                            text: 'Option 3',
                        },
                        {
                            value: 4,
                            text: 'Option 4',
                            disabled: true
                        },
                    ]}
                />
            </>
        </ThemeProvider>
    );
}

export default App;