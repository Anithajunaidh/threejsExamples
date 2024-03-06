// import '@/styles/global.css';
// import theme from '@/utils/theme';
// import { ThemeProvider } from '@mui/material/styles';
// import type { AppProps } from 'next/app';


// const MyApp = ({ Component, pageProps }: AppProps) => (
//   <ThemeProvider theme={theme}>
//   <Component {...pageProps} />
//   </ThemeProvider>
// );

// export default MyApp;

import '@/styles/global.css';
import { ThemeProvider} from '@/utils/ThemeProvider'; // Replace './ThemeContext' with the actual path to your ThemeContext
import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
// import store from '@/app/store';
// import { Provider } from 'react-redux';
//import theme from '@utils/theme';
const MyApp = ({ Component, pageProps }: AppProps) => {
 
  return (
    // <Provider store={store}>
          <ThemeProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
    // </Provider>
  );
};
export default MyApp;


