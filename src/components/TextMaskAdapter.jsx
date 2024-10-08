import * as React from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";

export const TextMaskAdapter = React.forwardRef(function TextMaskAdapter(
  props,
  ref
) {
  const { onChange, onBlur, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(+000) 000-000000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      onBlur={onBlur}
      overwrite
    />
  );
});

TextMaskAdapter.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};
