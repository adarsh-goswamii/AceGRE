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
import { Snackbar, Backdrop, CircularProgress, Select, FormControl, TextField, InputLabel } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    backdrop: {
        zIndex: 100,
        color: '#fff',
    },
    formControl: {
        margin: '0px 0px 0px 32px',
        width: '40%', 
        background: '#fff'
    }
}));

// function later(delay) {
//     return new Promise(function (resolve) {
//         setTimeout(resolve, delay);
//     });
// }

const Form = (props) => {
    const classes = useStyles();
    const [word, setWord] = useState('');
    const [funfact, setFunfact] = useState('');
    const [meanings, setMeaning] = useState([{ meaning: '' }]);
    const [mneumonics, setMneumonics] = useState([{ mneumonic: '' }]);
    const [sentences, setSentences] = useState([{ sentence: '' }]);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [partOfSpeech, setPartOfSpeech] = useState('');

    // console.log("data", props?.value);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    async function submit() {
        setLoading(true);
        let obj = {
            title: word,
            part_of_speech: partOfSpeech,
            fun_fact: funfact,
            meanings,
            mneumonics,
            sentences
        };

        let response;
        try {
            response = await addWord(obj);
        } catch (error) {
            console.log('error', error);
            setLoading(false);
            setSuccess(false);
            setOpen(true);
            return;
        }

        console.log('response', response);
        if (response.status === 201) {
            setLoading(false);
            setSuccess(true);
            setOpen(true);
            setWord('');
            setFunfact('');
            setMeaning([]);
            setMneumonics([]);
            setSentences([]);
        } else {
            setLoading(false);
            setSuccess(false);
            setOpen(true);
        }
    }

    return (
        <Flex flexDirection={'column'} justifyContent={'space-between'} height={'100%'}>

            <Heading color='dark_blue' fontSize={'2xl'} fontFamily={'medium'} mb={4}>Fill following details to add a word. </Heading>

            <div className={classes.root}>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                    <div>
                        {
                            success ?
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    Word Added Successfully !
                                </Alert>
                                :
                                <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                                    OOPS! Something went wrong.
                                </Alert>
                        }
                    </div>
                </Snackbar>
            </div>

            <div>
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="#000000" />
                </Backdrop>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Input type='text' placeholder='Enter Word' value={word} onChange={setWord} />
                <FormControl variant="outlined" className={classes.formControl} size='small'>
                    <InputLabel htmlFor="outlined-age-native-simple">Part of Speech</InputLabel>
                    <Select
                        native
                        value={partOfSpeech}
                        onChange={(event) => setPartOfSpeech(event.target.value)}
                        label="Part of speech"
                        inputProps={{
                            name: 'Part of Speech',
                            id: 'part-of-speech',
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value={'Noun'}>Noun</option>
                        <option value={'Adjective'}>Adjective</option>
                        <option value={'Verb'}>Verb</option>
                    </Select>
                </FormControl>
            </div>

            <DynamicInput
                heading='Add Meaning for the given word'
                btn_text='Add Meaning'
                leftIcon={<IoAddOutline />}
                value={meanings}
                property='meaning'
                setValue={setMeaning}
                type='text'
                placeholder='Add meaning' />

            <DynamicInput
                heading='Add Mneumonics for the given word'
                btn_text='Add Mneumonics'
                leftIcon={<IoAddOutline />}
                value={mneumonics}
                property='mneumonic'
                setValue={setMneumonics}
                type='text'
                placeholder='Add Mneumonics' />

            <DynamicInput
                heading='Add Sentences for the given word'
                btn_text='Add Sentences'
                leftIcon={<IoAddOutline />}
                value={sentences}
                property='sentence'
                setValue={setSentences}
                type='text'
                placeholder='Add Sentences' />

            <Text ml={'32px'} mt={'16px'} color='dark_blue' fontFamily={'regular'} fontSize='md'>Enter Fun Fact</Text>
            <TextArea type='text' placeholder='Enter FunFact' value={funfact} onChange={(e) => setFunfact(`${e.target.value}`)} />

            <Flex justifyContent={'space-between'} mt={'44px'}>
                <Button text='Reset' leftIcon={<BiReset />} />
                <Button text='Submit ' onClick={submit} rightIcon={<BsFillPatchCheckFill />} />
            </Flex>

        </Flex >
    );
};

export default Form;