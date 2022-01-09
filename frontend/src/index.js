import React from 'react';
import App from './Pages/App';
import { ChakraProvider, ColorModeScript} from '@chakra-ui/react';
import Fonts from './Fonts';
import theme from './Theme';
import ReactDOM from 'react-dom';
import './index.css';

const Index = () => {
  return (
    <ChakraProvider theme={theme} >
      <Fonts />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  );
};

ReactDOM.render(
  <Index /> ,document.getElementById('root')
);