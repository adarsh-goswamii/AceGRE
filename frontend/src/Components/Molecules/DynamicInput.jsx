import React, { useState, useRef, useCallback } from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import Input from '../Atoms/InputField';
import Button from '../Atoms/Button';
import { useEffect } from 'react';

const DynamicInput = (props) => {
    let [input, setInput] = useState([]);

    useEffect(() => {
        if (props.value.length === 0) setInput([])
    }, [props.value]);

    function onChange(value, id) {
        props.setValue(prev => {
            const temp = [...prev];
            temp[id][props.property] = value;
            return temp;
        });
    }

    function addInput() {
        setInput(prev => [...prev, <Input placeholder={props.placeholder} type={props.type} key={prev.length} onChange={onChange} id={prev.length}/> ]);
        const obj = {};
        obj[props.property] = '';
        props.setValue(prev => [...prev, obj]);
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