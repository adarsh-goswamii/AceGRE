import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';

const AdminNavMenuItem= (props)=> {
    return (
        <Flex 
            width={'100%'} 
            cursor={'pointer'}
            justifyContent={'flex-start'} 
            pl={'60px'} py={'12px'} 
            alignItems={'center'} 
            color='#fff'
            my={2}
            position={'relative'} 
            _after={props.active? { content: '""', position: 'absolute', width: '90%', height: '100%', background: '#fff', right: 0, top: 0, borderRadius: '50px 0px 0px 50px ' }: {}}
            color={props.active? 'dark_blue': '#fff'}
            fontSize='20px'>
            <Box zIndex={2}>{props.icon}</Box>
            <Text zIndex={2} fontSize={'md'} fontFamily={'medium'} ml={4} >{props.text}</Text>
        </Flex>
    );  
};

export default AdminNavMenuItem;