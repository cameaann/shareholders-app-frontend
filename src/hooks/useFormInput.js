import { useState } from 'react';

export function useFormInput(initialValue='') {
  const [value, setValue] = useState(initialValue);
  const[isDirty, setDirty] = useState(false);
  const reset = () => setValue(initialValue); 

  function handleChange(e) {
    setValue(e.target.value);
    setDirty(true)
  }

  const inputProps = {
    value: value,
    onChange: handleChange,
    isDirty,
    reset
  };

  return {...inputProps};
}
