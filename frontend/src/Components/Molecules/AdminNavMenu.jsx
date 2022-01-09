import React from 'react';
import {Flex} from '@chakra-ui/react';
import AdminNavMenuItem from '../Atoms/AdminNavMenuItem';
import {MdDashboard} from 'react-icons/md';

const AdminNavMenu= () => {
    return (
        <Flex flexDirection={'column'} alignItems={'center'} width={'100%'}>
            <AdminNavMenuItem active={true} text={'List of Words'} icon={<MdDashboard />} />
            <AdminNavMenuItem text={'Profile'} icon={<MdDashboard />} />
            <AdminNavMenuItem text={'Add Word'} icon={<MdDashboard />} />
            <AdminNavMenuItem text={'Messages'} icon={<MdDashboard />} />
        </Flex>
    );
};

export default AdminNavMenu;