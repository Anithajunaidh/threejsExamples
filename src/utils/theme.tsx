
// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976D2', // Your primary color
//     },
//     secondary: {
//       main: '#FF4081', // Your secondary color
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif', // Your default font
//   },
// });

// export default theme;
// themes.ts

// themes.ts

// themes.ts

// import { createTheme } from '@mui/material/styles';

// // Define a common type for your theme options
// type ThemeOptions = {
//   palette: {
//     primary: {
//       main: string;
//     };
//     secondary: {
//       main: string;
//     };
//     mode: 'light' | 'dark';
//     background:{
//       default:string;
//       paper:string;
//     }
    
//   };
//   typography: {
//     fontFamily: string;
//   };
// };

// // Helper function to create themes
// function createMyTheme(options: ThemeOptions) {
//   return createTheme(options);
// }

// // Light Theme
// export const lightTheme = createMyTheme({
//   palette: {
//     primary: {
//       main: '#1976D2',
//     },
//     secondary: {
//       main: '#FF4081',
//     },
//     background: {
//       default: '#ad36bf', // Background color for components
//       paper: '#f5f5f5'},
//     mode: 'light',
//   },
//   typography: {
//     fontFamily: 'Poppins, sans-serif',
//   },
// });

// // Dark Theme
// export const darkTheme = createMyTheme({
//   palette: {
//     primary: {
//       main: '#1976D2',
//     },
//     secondary: {
//       main: '#FF4081',
//     },
//     mode: 'dark',
//     background: {
//       default: '#ad36bf', // Background color for components
//       paper: '#f5f5f5',}
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//   },
// });

// // Purple Theme
// export const purpleTheme = createMyTheme({
//   palette: {
//     primary: {
//       main: '#ad36bf',
//     },
//     secondary: {
//       main: '#FF4081',
//     },
//     background: {
//       default: '#ad36bf', // Background color for components
//       paper: '#f5f5f5', // Background color for paper-like surfaces (dialogs, cards, etc.)
//     },
//     mode: 'light', // You can set this to 'dark' or 'light' based on your preference
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//   },
// });


// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: 'var(--primary)',
//     },
//     background: {
//       default: 'var(--neutralBg)',
//       paper: 'var(--primaryBg)',
//     },
//     text: {
//       primary: 'var(--onNeutralBg)',
//     },
//   },
// });

// export default theme;

// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#ff5722', // Replace with the HEX or RGB value you want
//     },
//     background: {
//       default: 'white',
//       paper: 'var(--primaryBg)',
//     },
//     text: {
//       primary: 'var(--onNeutralBg)',
//     },
//   },
// });

// export default theme;
import * as themeVars from '@/utils/Themevariables';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: themeVars.primary,
    },
    background: {
      default: 'white',
      paper: themeVars.primaryBg,
    },
    text: {
      primary: themeVars.onNeutralBg,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: themeVars.placeholderColor, // Use your desired placeholder color variable
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& $notchedOutline': {
            borderColor: themeVars.customOutlineColor, // Use your desired outline color variable
          },
          '&:hover $notchedOutline': {
            borderColor: themeVars.hoverOutlineColor, // Use your desired hover outline color variable
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: themeVars.focusedLabelColor, // Use your desired focused label color variable
          },
        },
      },
    },
  },
});

export default theme;

