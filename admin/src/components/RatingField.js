import {
  Field,
  FieldError,
  FieldHint,
  FieldLabel,
} from "@strapi/design-system/Field";
import React, { useState } from "react";
import styled from "styled-components";

const StarIcon = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>{" "}
    </svg>
  );
};

const RatingInput = ({
  className,
  children,
  onMouseOver,
  onMouseOut,
  ...props
}) => {
  return (
    <label
      className={className}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <input type="radio" {...props} hidden />
      {children}
    </label>
  );
};

const StyledStarIcon = styled(StarIcon)`
  width: 2rem;
  height: 2rem;
  fill: ${({ active, theme }) =>
    active ? theme.colors.warning500 : theme.colors.neutral200};
`;

const StyledRatingInput = styled(RatingInput)`
  display: inline-flex;
  cursor: pointer;
  transition: transform 0.1s;
  &:hover {
    transform: scale(1.2);
  }
`;

const StyledFlex = styled("div")`
  margin-top: 0.25rem;
  padding: ${({ theme }) => theme.spaces[2]};
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: center;
`;

const RatingField = ({
  attribute,
  description,
  disabled,
  error,
  intlLabel,
  name,
  value: initialValue,
  onChange,
  required,
}) => {
  const uid = `${name}-${Date.now()}`;
  const label = intlLabel.id ? intlLabel.defaultMessage : name;
  const hint = description?.id ? description.defaultMessage : "";
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue) => {
    setValue(newValue);
    onChange({ target: { name, value: newValue, type: "integer" } });
  };

  return (
    <Field name={name} hint={hint} error={error} required={required}>
      <FieldLabel htmlFor={uid}>{label}</FieldLabel>
      <StyledFlex>
        {[...Array(5)].map((_, index) => (
          <StyledRatingInput
            key={index}
            name={uid}
            id={uid + index}
            onChange={() => handleChange(index + 1)}
            onMouseOver={() => setValue(index + 1)}
            onMouseOut={() => setValue(initialValue)}
          >
            <StyledStarIcon active={value >= index + 1} />
          </StyledRatingInput>
        ))}
      </StyledFlex>
      <FieldHint />
      <FieldError />
    </Field>
  );
};

RatingField.defaultProps = {};

export default RatingField;
