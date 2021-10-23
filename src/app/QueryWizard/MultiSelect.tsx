import React, { useState } from 'react';
import {
  capitalize,
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
} from '@patternfly/react-core';

import {
  selectOptionsComponent,
  updateOptionsComponent,
} from '../../redux/apiSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectParamsComponent,
  updateParamsComponent,
} from '../../redux/wizardSlice';

interface MultiSelectProps {
  component: string;
  title: string;
}

const MultiSelect = ({
  component,
  title,
}: MultiSelectProps): React.FC<MultiSelectProps> => {
  const dispatch = useAppDispatch();
  const params = useAppSelector(selectParamsComponent(component));
  const options = useAppSelector(selectOptionsComponent(component));
  console.log(component, params, options);
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = (isOpen) => {
    setIsOpen(isOpen);
  };

  const onSelect = (event, selection) => {
    if (params.includes(selection)) {
      dispatch(
        updateParamsComponent({
          component,
          params: params.filter((v) => v !== selection),
        })
      );
    } else {
      dispatch(
        updateParamsComponent({ component, params: [...params, selection] })
      );
    }
  };

  const onCreateOption = (newOption) => {
    dispatch(
      updateOptionsComponent({ component, options: [...options, newOption] })
    );
  };

  const onClear = () => {
    console.log(component);
    dispatch(updateParamsComponent({ component, params: [] }));
  };

  return (
    <FormGroup label={title}>
      <Select
        aria-label={`${capitalize(component)} form selection`}
        chipGroupProps={{
          numChips: 2,
          expandedText: 'Hide',
          collapsedText: 'Show ${remaining}',
        }}
        variant={SelectVariant.typeaheadMulti}
        typeAheadAriaLabel={`Select ${title}`}
        placeholderText={`Select ${title}`}
        isOpen={isOpen}
        onToggle={onToggle}
        onSelect={onSelect}
        selections={params}
        isCreatable
        onCreateOption={onCreateOption}
        onClear={onClear}
        width="450px"
      >
        {options.map((v, i) => (
          <SelectOption
            key={i}
            value={v.value || v}
            description={v.description}
          />
        ))}
      </Select>
    </FormGroup>
  );
};

export default MultiSelect;
