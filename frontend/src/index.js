import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import Button from './components/shared/button/Button';

const Index = () => {
  return (
    <>
      Hello
      <div style={{ padding: '100px', background: '#eeeeee' }}>
        <Button fullWidth={false} variant="outlined">
          Click me 
        </Button>
      </div>
    </>
  );
};

ReactDOM.render(
  <Index /> ,document.getElementById('root')
);