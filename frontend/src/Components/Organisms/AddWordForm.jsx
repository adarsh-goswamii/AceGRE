import React from 'react';
import { Flex, Text, Heading } from '@chakra-ui/react';
import Input from '../Atoms/InputField';
import DynamicInput from '../Molecules/DynamicInput';
import Button from '../Atoms/Button';
import TextArea from '../Atoms/TextArea';
import { IoAddOutline } from 'react-icons/io5';
import { BiReset } from 'react-icons/bi';
import { BsFillPatchCheckFill } from 'react-icons/bs';


const Form = (props) => {
    return (
        <Flex flexDirection={'column'} justifyContent={'space-between'} height={'100%'}>

            <Heading color='dark_blue' fontSize={'2xl'} fontFamily={'medium'} mb={4}>Fill following details to add a word. </Heading>

            <Text ml={'32px'} color='dark_blue' fontFamily={'regular'} fontSize='md'>Enter Word</Text>
            <Input type='text' placeholder='Enter Word here....' />

            <Text ml={'32px'} mt={'16px'} color='dark_blue' fontFamily={'regular'} fontSize='md'>Enter Fun Fact</Text>
            <TextArea type='text' placeholder='Enter Fun Fact here....' />

            <DynamicInput
                heading='Add Meaning for the given word'
                btn_text='Add Meaning'
                leftIcon={<IoAddOutline />}
                type='text'
                placeholder='Add meaning here..........' />

            <DynamicInput
                heading='Add Mneumonics for the given word'
                btn_text='Add Mneumonics'
                leftIcon={<IoAddOutline />}
                type='text'
                placeholder='Add Mneumonics here..........' />

            <DynamicInput
                heading='Add Sentences for the given word'
                btn_text='Add Sentences'
                leftIcon={<IoAddOutline />}
                type='text'
                placeholder='Add Sentences here..........' />

            <Flex justifyContent={'space-between'} mt={'44px'}>
                <Button text='Reset' leftIcon={<BiReset />} />
                <Button text='Submit ' rightIcon={<BsFillPatchCheckFill />} />
            </Flex>

        </Flex>
    );
};

export default Form;