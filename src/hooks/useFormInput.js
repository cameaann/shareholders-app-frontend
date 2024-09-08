import { useState } from 'react';

export function useFormInput(initialValue='') {
  const [value, setValue] = useState(initialValue);
  const reset = () => setValue(initialValue); 

  function handleChange(e) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange,
    reset
  };

  return {...inputProps};
}
