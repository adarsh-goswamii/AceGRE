import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import AdminNavigation from '../Components/Organisms/AdminNavigation';
import Form from '../Components/Organisms/AddWordForm';

const App = () => {
    return (
        <Flex width={['100%']} >
            <AdminNavigation />

            <Box width={'100%'} pl={'340px'} pr={'100px'} py={'40px'}>

                <Form />

            </Box>
        </Flex>
    )
};

export default App;