import { useState } from 'react';
import './App.css';
import { Select } from './components/select/select';

function App() {
  const [count, setCount] = useState(0);

  return (
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
      ]}
    />
  );
}

export default App;
