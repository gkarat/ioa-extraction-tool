import React, { FormEventHandler, useState } from 'react';
import {
  InputGroup,
  Pagination,
  Select,
  SelectOption,
  SelectVariant,
  TextInput,
  TextInputTypes,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarItemVariant,
  ToolbarToggleGroup,
} from '@patternfly/react-core';

import {
  selectOptionsComponent,
  selectTotal,
  updateOptionsComponent,
} from '../../reducers/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  FILTERS,
  resetFilter,
  resetFilters,
  selectActiveToggle,
  selectFilters,
  updateActiveToggle,
  updateFilters,
} from '../../reducers/wizard/sample';

const TableToolbar = (): React.FC => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const activeToggle = useAppSelector(selectActiveToggle);
  const activeToggleName = FILTERS[activeToggle].name;

  const availableFromApi = useAppSelector(selectOptionsComponent(activeToggle));
  const page = filters.offset / filters.limit + 1;

  const onTextInputChange: FormEventHandler<HTMLInputElement> = (event) => {
    dispatch(
      updateFilters({ ...filters, [activeToggle]: event?.target?.value })
    );
  };

  const onMultiSelect = (event, selection) => {
    if ((filters?.[activeToggle] || []).includes(selection)) {
      dispatch(
        updateFilters({
          ...filters,
          [activeToggle]: (filters?.[activeToggle] || []).filter(
            (v) => v !== selection
          ),
        })
      );
    } else {
      dispatch(
        updateFilters({
          ...filters,
          [activeToggle]: [...(filters?.[activeToggle] || []), selection],
        })
      );
    }
  };

  const onCreateOption = (newOption) => {
    dispatch(
      updateOptionsComponent({
        component: activeToggle,
        options: [...availableFromApi, newOption],
      })
    );
  };

  const [filterToggleExpanded, setFilterToggleExpanded] =
    useState<boolean>(false);
  const [toggleExpanded, setToggleExpanded] = useState<boolean>(false);

  const onDeleteChip = (category, chip) => {
    const key = Object.entries(FILTERS).find(
      ([filterKey, filterValue]) => filterValue.name === category
    )[0];
    let updated;
    if (key === 'uuid') {
      updated = '';
    }
    if (key === 'managed') {
      updated = 'all';
    } else if (Array.isArray(filters[key])) {
      updated = filters[key].filter((v) => v !== chip);
    }
    dispatch(
      updateFilters({
        ...filters,
        [key]: updated,
      })
    );
  };

  const onDeleteChipGroup = (category) => {
    const key = Object.entries(FILTERS).find(
      ([filterKey, filterValue]) => filterValue.name === category
    )[0];
    dispatch(resetFilter(key));
  };

  const onClearAllFilters = () => {
    dispatch(resetFilters());
  };

  console.log(filters);

  return (
    <Toolbar
      id="wizard-clusters-table-toolbar"
      clearAllFilters={onClearAllFilters}
    >
      <ToolbarContent>
        <ToolbarItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Active filter toggle"
            selections={activeToggle}
            isOpen={filterToggleExpanded}
            onToggle={(isExpanded) => setFilterToggleExpanded(isExpanded)}
            onSelect={(event, value) => dispatch(updateActiveToggle(value))}
          >
            {Object.entries(FILTERS).map((e) => (
              <SelectOption key={e[0]} value={e[0]}>
                {e[1].name}
              </SelectOption>
            ))}
          </Select>
        </ToolbarItem>
        <ToolbarToggleGroup breakpoint="xl">
          <ToolbarGroup variant="filter-group">
            {Object.entries(FILTERS).map((e) => {
              let chips = [];
              const filterKey = e[0];
              const filterValue = filters[e[0]];
              if (Array.isArray(filterValue)) {
                chips = chips.concat(filterValue);
              } else if (
                typeof filterValue === 'string' &&
                filterValue.length > 0
              ) {
                const chip = FILTERS[filterKey].values
                  ? FILTERS[filterKey].values.find((v) => v.key === filterValue)
                      .name
                  : filterValue;
                chip !== 'All' && chip !== 'all' && chips.push(chip);
              }
              return (
                <ToolbarFilter
                  key={e[0]}
                  chips={chips}
                  categoryName={e[1].name}
                  deleteChip={onDeleteChip}
                  deleteChipGroup={
                    Array.isArray(chips) ? onDeleteChipGroup : undefined
                  }
                />
              );
            })}
            {FILTERS[activeToggle].type === SelectVariant.typeahead && (
              <InputGroup>
                <TextInput
                  name="text-input"
                  id="text-input"
                  type={TextInputTypes.search}
                  onInput={onTextInputChange}
                  value={filters[activeToggle]}
                  placeholder={`Search by ${activeToggleName}`}
                ></TextInput>
              </InputGroup>
            )}
            {FILTERS[activeToggle].type === SelectVariant.single && (
              <Select
                variant={SelectVariant.single}
                aria-label={`Select ${activeToggleName}`}
                selections={filters[activeToggle]}
                isOpen={toggleExpanded}
                onToggle={(isExpanded) => setToggleExpanded(isExpanded)}
                onSelect={(event, value) =>
                  dispatch(updateFilters({ ...filters, [activeToggle]: value }))
                }
                width="150px"
              >
                {FILTERS[activeToggle].values.map((v) => (
                  <SelectOption key={v.key} value={v.key}>
                    {v.name}
                  </SelectOption>
                ))}
              </Select>
            )}
            {FILTERS[activeToggle].type === SelectVariant.typeaheadMulti && (
              <Select
                variant={SelectVariant.typeaheadMulti}
                chipGroupProps={{
                  numChips: 1,
                  expandedText: 'Hide',
                  collapsedText: 'Show ${remaining}',
                }}
                aria-label={`Select ${activeToggleName}`}
                selections={filters?.[activeToggle] || []}
                isOpen={toggleExpanded}
                onToggle={(isExpanded) => setToggleExpanded(isExpanded)}
                onSelect={onMultiSelect}
                isCreatable
                onCreateOption={onCreateOption}
                placeholderText={`Search by ${activeToggleName}`}
              >
                {(availableFromApi || []).map((v) => (
                  <SelectOption key={v} value={v} />
                ))}
              </Select>
            )}
          </ToolbarGroup>
        </ToolbarToggleGroup>
        <ToolbarItem variant={ToolbarItemVariant.pagination}>
          <Pagination
            itemCount={useAppSelector(selectTotal)}
            perPage={filters.limit}
            page={page}
            onSetPage={(event, page) => {
              dispatch(
                updateFilters({
                  ...filters,
                  offset: filters.limit * (page - 1),
                })
              );
            }}
            onPerPageSelect={(event, perPage) => {
              dispatch(
                updateFilters({ ...filters, limit: perPage, offset: 0 })
              );
            }}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};

export default TableToolbar;
