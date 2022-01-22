import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        border: '1px soluid #2E2E48',
        background: '#fff',
        margin: '16px 0px', 
        width: '100%'
    }
}));

const InputField = (props) => {
    const classes = useStyles();

    return (
        <TextField 
            id={props.id}
            className={classes.container}
            autoComplete='off'
            label={props.placeholder}
            size='small'
            value={props.value}
            onChange={(e)=> props.onChange(`${e.target.value}`, props.id)}
            type={props.type}
            variant={'outlined'}
            />
    );
};

export default InputField;