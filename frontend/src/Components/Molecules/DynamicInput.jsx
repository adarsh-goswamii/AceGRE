import React, { useState } from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import Input from '../Atoms/InputField';
import Button from '../Atoms/Button';

const DynamicInput = (props) => {
    let [input, setInput] = useState([<Input placeholder={props.placeholder} type={props.type} key={0} />]);

    function addInput() {
        setInput(prev => [...prev, <Input placeholder={props.placeholder} type={props.type} key={prev.length} />]);
    }

    return (
        <Flex flexDirection={'column'} h={'fit-content'} mt={8}>
            <Flex justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Text fontSize='18px' color={'dark_blue'} fontFamily={'semibold'}>{props.heading}</Text>
                <Button text={props.btn_text} leftIcon={props.leftIcon} onClick={addInput} />
            </Flex>

            <Flex
                className='scroll'
                flexDirection={'column'}>
                {input.map(i => i)}
            </Flex>
        </Flex >
    );
};

export default DynamicInput;