import React from 'react';
import { Textarea } from '@chakra-ui/react';

const TextArea= (props)=> {
    return (
        <Textarea
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

export default TextArea;