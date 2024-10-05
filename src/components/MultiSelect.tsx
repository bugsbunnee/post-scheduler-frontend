import React from 'react';
import makeAnimated from 'react-select/animated';
import Select, { MultiValue, StylesConfig } from 'react-select'

import { Flex } from '@chakra-ui/react';
import { MultiSelectOption } from '@/utils/models';

interface Props {
    options: MultiSelectOption[]
    placeholder: string;
    value: MultiSelectOption[];
    onChange: (options: MultiValue<unknown>) => void;
}

const animatedComponents = makeAnimated();


const colourStyles: StylesConfig<Props['options'][0], true> = {
    control: (styles) => ({
         ...styles, 
        backgroundColor: 'white', 
        width: '100%',
        color: 'black',
        border: '1px solid #e5e7eb',
        fontSize: '0.875rem',
        outline: 'none',
        borderRadius: '0.25rem',
    }),
    container: (styles) => ({ 
        ...styles,
        width: '100%',
    }),
    option: (styles) => ({
        ...styles,
        color: 'black',
        backgroundColor: 'white',
    }),
  };

const MultiSelect: React.FC<Props> = ({ options, placeholder, value, onChange }) => {
    return ( 
        <Flex fontSize='small' gap={4} align='center'>
            <Select
                onChange={onChange}
                styles={colourStyles}
                closeMenuOnSelect={false}
                placeholder={placeholder}
                components={animatedComponents}
                isMulti
                defaultValue={value}
                options={options}
            />
        </Flex>
    );
};
 
export default MultiSelect;