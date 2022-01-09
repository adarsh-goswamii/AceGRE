import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'poppins-bolder';
        src: url('/fonts/Poppins-ExtraBold.ttf');
      }

      @font-face {
        font-family: 'poppins-bold';
        src: url('/fonts/Poppins-Bold.ttf');
      }

      @font-face {
        font-family: 'poppins-light';
        src: url('/fonts/Poppins-Light.ttf');
      }

      @font-face {
        font-family: 'poppins-regular';
        src: url('/fonts/Poppins-Regular.ttf');
      }

      @font-face {
        font-family: 'poppins-semibold';
        src: url('/fonts/Poppins-SemiBold.ttf');
      }

      @font-face {
        font-family: 'poppins-medium';
        src: url('/fonts/Poppins-Medium.ttf');
      }

      @font-face {
        font-family: 'poppins-black';
        src: url('/fonts/Poppins-Black.ttf');
      }

      @font-face {
        font-family: 'lemon';
        src: url('/fonts/Lemon Tuesday.otf');
      }

      `}
  />
)

export default Fonts;