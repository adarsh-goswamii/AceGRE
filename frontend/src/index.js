import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import InputField from './components/shared/inputField/InputField';

const Index = () => {
  return (
    <>
      Hello
      <div style={{ padding: '100px', background: '#eeeeee' }}>
        <InputField 
          value={"null"}
          onChange={()=> {}}
          placeholder="TYpe here"
          label="Testing"
          error={true}
          helperText={"Start typing"}
          type="text"/>
      </div>
    </>
  );
};

ReactDOM.render(
  <Index /> ,document.getElementById('root')
);