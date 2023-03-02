import { useState } from 'react';

function useInputs(initialState) {
  const [value, setValue] = useState(initialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    handleChange,
  };
}

export default useInputs;
