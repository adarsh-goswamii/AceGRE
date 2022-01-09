import React from 'react';
import { Button } from '@chakra-ui/react';

const SolidButton = (props) => {
    return (
        <Button
            rightIcon={props.rightIcon}
            leftIcon={props.leftIcon}
            onClick={props.onClick}
            bgColor={'dark_blue'}
            px={[8]}
            py={[2]}
            fontFamily={'regular'}
            display={'flex'}
            alignItems={'center'}
            color={'#fff'}
            width={'fit-content'}
            _hover={{ bg: 'dark_blue' }}
            _active={{ bg: 'grey', color: 'dark_blue'}}
            variant='solid' >
                {props.text}
        </Button>
    );
};

export default SolidButton;