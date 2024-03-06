import Typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export const corePlugins = {
  preflight: false,
};
export const content = ['./src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },
  extend: {
    screens: {
      'md': '640px',
    },
    // themes: {
    //   pink: {
    //     styles: {
    //       '.theme-pink': {
    //         backgroundColor: 'pink',
    //         color: 'pink',
    //       },
    //     },
    //   },
    //   red: {
    //     styles: {
    //       '.theme-red': {
    //         backgroundColor: '#00AA7F',
    //         color: 'white',
    //       },
    //     },
    //   },
    //   blue: {
    //     styles: {
    //       '.theme-blue': {
    //         backgroundColor: 'blue',
    //         color: 'white',
    //       },
    //     },
    //   },
    // },
    colors: {
      // onNeutralBg: 'var(--onNeutralBg)',
      // neutralBg: 'var(--neutralBg)',
      // onPrimaryBg: 'var(--onPrimaryBg)',
      // primaryBg: 'var(--primaryBg)',
      // primary: 'var(--primary)',  
      lightgreen:'#00AA7F',
      darkgreen:'#06513B',
      grayblack:'#595656',
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      buttons: 'var(--color-buttons)',
      typography: 'var(--color-typography)',
      // emerald: colors.emerald,
      // fuchsia: colors.fuchsia,
      // 'th-background': 'var(--background)',
      // 'th-background-secondary': 'var(--background-secondary)',
      // 'th-foreground': 'var(--foreground)',
      // 'th-primary-dark': 'var(--primary-dark)',
      // 'th-primary-medium': 'var(--primary-medium)',
      // 'th-primary-light': 'var(--primary-light)',
      // 'th-accent-dark': 'var(--accent-dark)',
      // 'th-accent-medium': 'var(--accent-medium)',
      // 'th-accent-light': 'var(--accent-light)',

    },
      flexCenter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      backgroundImage: {
        hero_img_large: "url('../images/bg_wave.svg')",
        hero_img: "url('../images/bg_mobile.svg')",
        DrCheckingSrWoman:"url('../images/DrCheckingSrWoman.svg')",
        homenurse:"url('../images/bg_homenurse.svg')"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans'],
      },
      borderRadius: {
        'large': '60px',
      },
      darkMode: 'class',
    }
};
export const plugins = [];
