import { useState } from 'react';

export function useFormInput(initialValue='') {
  const [value, setValue] = useState(initialValue);
  const[isDirty, setDirty] = useState(false);
  const reset = () => setValue(initialValue); 

  function handleChange(e) {
    setValue(e.target.value);
    setDirty(true)
  }

  function handleFocus() {
    if (value === initialValue) {
      setValue(''); // Clear the value on focus if it matches the initial predefined value
    }
  }

  function handleBlur() {
    if (value === '') {
      setValue(initialValue); // Reset to initial value if input is empty on blur
    }
  }

  const inputProps = {
    value: value,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    isDirty,
    reset
  };

  return {...inputProps};
}
