import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { RiLogoutCircleLine } from 'react-icons/ri';

const Logout= (props) => {
    return (    
        <Flex 
            py={'12px'}
            px={'40px'}
            position={'relative'}
            color='#fff'
            boxShadow={'0px 0px 10px rgba(0, 0, 0, 0.2)'}
            onClick={props.onClick}
            bgGradient={'linear(to-tr, #2E2E4800, #483FBD)'}
            borderRadius={'40px'}>
                <RiLogoutCircleLine style={{ fontSize: '24px'}}></RiLogoutCircleLine>
                <Text fontSize={'md'} fontFamily={'semibold'} ml={2}>Logout</Text>
        </Flex>
    );
};

export default Logout;