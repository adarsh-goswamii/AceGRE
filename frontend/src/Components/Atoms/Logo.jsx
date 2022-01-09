import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Logo= ()=> {
    return (
        <Flex justifyContent='center' alignItems='center' fontSize='xl' >
            <img src="/logo.svg" alt="logo image" style={{ width: '25px' }}/>
            <Text color='#fff' fontFamily='semibold' ml={2}>
                AceGRE
            </Text>
        </Flex>
    );
};

export default Logo;