import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import Logo from '../Atoms/Logo';

const AdminNavHeader = (props) => {
    return (
        <Flex flexDirection={'column'} alignItems={'center'}>
            <Logo></Logo>
            <Image src="/avatar.svg" alt="avatar" width={'75px'} mt={'16px'} />
            <Text color='#fff' fontFamily={'medium'} fontSize={'lg'} mt={'16px'}>Sparsh Goswami</Text>
            <Text color='grey' fontFamily={'light'} fontSize={'sm'}>Admin Account</Text>
        </Flex>
    );
};

export default AdminNavHeader;