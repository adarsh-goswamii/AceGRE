import React from 'react';
import { Input } from '@chakra-ui/react';

const InputField= (props)=> {
    return (
        <Input 
            placeholder={props.placeholder}
            size={props.size}
            value={props.value}
            onChange={props.onChange}
            type={props.type}
            variant={'outline'}
            border={'1px solid'}
            borderColor={'#2E2E48'}
            fontFamily={'light'}
            bg='#fff'
            py={'8px'}
            px={'32px'}
            my={2}
            />
    );
};

export default InputField;