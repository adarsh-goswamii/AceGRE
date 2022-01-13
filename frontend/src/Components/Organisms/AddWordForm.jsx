import React, { useEffect, useState } from 'react';
import { Flex, Text, Heading } from '@chakra-ui/react';
import Input from '../Atoms/InputField';
import DynamicInput from '../Molecules/DynamicInput';
import Button from '../Atoms/Button';
import TextArea from '../Atoms/TextArea';
import { IoAddOutline } from 'react-icons/io5';
import { BiReset } from 'react-icons/bi';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import addWord from '../../api/addword';

const Form = (props) => {
    const [word, setWord]= useState('');
    const [funfact, setFunfact]= useState('');
    const [meanings, setMeaning]= useState([{meaning: ''}]);
    const [mneumonics, setMneumonics]= useState([{mneumonic: ''}]);
    const [sentences, setSentences]= useState([{sentence: ''}]);

    async function submit() {
        let obj= {
            title: word, 
            fun_fact: funfact, 
            meanings, 
            mneumonics, 
            sentences
        };

        let response= await addWord(obj);
        if(response.status=== 500) {
            alert('Failed to add word', response);
        } else alert('Word Added successfully', response);
    }

    return (
        <Flex flexDirection={'column'} justifyContent={'space-between'} height={'100%'}>

            <Heading color='dark_blue' fontSize={'2xl'} fontFamily={'medium'} mb={4}>Fill following details to add a word. </Heading>

            <Text ml={'32px'} color='dark_blue' fontFamily={'regular'} fontSize='md'>Enter Word</Text>
            <Input type='text' placeholder='Enter Word here....' value={word} onChange={setWord}/>

            <DynamicInput
                heading='Add Meaning for the given word'
                btn_text='Add Meaning'
                leftIcon={<IoAddOutline />}
                value={meanings}
                property='meaning'
                setValue={setMeaning}
                type='text'
                placeholder='Add meaning here..........' />

            <DynamicInput
                heading='Add Mneumonics for the given word'
                btn_text='Add Mneumonics'
                leftIcon={<IoAddOutline />}
                value={mneumonics}
                property='mneumonic'
                setValue={setMneumonics}
                type='text'
                placeholder='Add Mneumonics here..........' />

            <DynamicInput
                heading='Add Sentences for the given word'
                btn_text='Add Sentences'
                leftIcon={<IoAddOutline />}
                value={sentences}
                property='sentence'
                setValue={setSentences}
                type='text'
                placeholder='Add Sentences here..........' />

            <Text ml={'32px'} mt={'16px'} color='dark_blue' fontFamily={'regular'} fontSize='md'>Enter Fun Fact</Text>
            <TextArea type='text' placeholder='Enter Fun Fact here....' value={funfact} onChange={(e)=> setFunfact(`${e.target.value}`)}/>

            <Flex justifyContent={'space-between'} mt={'44px'}>
                <Button text='Reset' leftIcon={<BiReset />} />
                <Button text='Submit ' onClick={submit} rightIcon={<BsFillPatchCheckFill />} />
            </Flex>

        </Flex>
    );
};

export default Form;