import React from 'react';
import { Flex, Text, Image, Heading } from '@chakra-ui/react';
import Header from '../Molecules/AdminNavHeader';
import AdminNavMenu from '../Molecules/AdminNavMenu'; 
import Logout from '../Atoms/Logout';

const AdminNavigation= ()=> {
    return (
        <Flex 
            position={'fixed'}
            top='0px'
            left='0px'
            flexDirection='column' 
            minW={['250px']} 
            minH={'100vh'}
            justifyContent={'space-between'}
            alignItems={'center'}
            py={['32px']} 
            borderRadius={'0px 26px 26px 0px'}
            boxShadow={'20px 20px 50px rgba(0, 0, 0, 0.2)'}
            bg='dark_blue'>
            
            <Header></Header>

            <AdminNavMenu></AdminNavMenu>

            <Logout></Logout>
        
        </Flex>
    );
};

export default AdminNavigation;