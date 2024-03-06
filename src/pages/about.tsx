import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const About = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
      recusandae quidem. Quaerat molestiae blanditiis doloremque possimus labore
      voluptatibus distinctio recusandae autem esse explicabo molestias officia
      placeat, accusamus aut saepe.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
      recusandae quidem. Quaerat molestiae blanditiis doloremque possimus labore
      voluptatibus distinctio recusandae autem esse explicabo molestias officia
      placeat, accusamus aut saepe.
    </p>
  </Main>
);

export default About;

// import type { NextPage } from 'next';
// import { useEffect, useState } from 'react';

// const colors = ['green', 'red', 'blue'];
// const modes = ['light', 'dark'];

// function useStickyState(defaultValue: string | undefined, key: string): [string | undefined, (v: string) => void] {
//   const [value, setValue] = useState<string | undefined>(defaultValue);

//   useEffect(() => {
//     const stickyValue = localStorage.getItem(key);
//     if (stickyValue !== null) {
//       setValue(stickyValue);
//     }
//   }, [key, setValue]);

//   return [value, (v) => {
//     localStorage.setItem(key, v);
//     setValue(v);
//   }];
// }

// const Home: NextPage = () => {
//   const [color, setColor] = useStickyState(colors[0], 'theme-color');
//   const [mode, setMode] = useStickyState(modes[0], 'theme-mode');

//   const handleColorChange = (newColor: string) => {
//     setColor(newColor);
//   };

//   return (
//     <div className={[
//       'font-mono bg-primaryBg h-screen flex flex-col justify-center',
//       color && `theme-${color}`,
//       mode && `theme-${mode}`,
//     ].filter(Boolean).join(' ')}>
//       <div className="mx-auto bg-neutralBg text-onNeutralBg border-8 border-onNeutralBg p-5 max-w-lg">
//         <h1 className="text-3xl font-bold text-center">
//           Tailwind Themes
//         </h1>

//         <div className="mt-5">
//           <p className="block">Select a color:</p>
//           <div className="flex justify-between space-x-8 mt-2">
//             {colors.map(c => (
//               <a
//                 href="#"
//                 className={`h-20 w-full flex justify-center items-center font-bold uppercase cursor-pointer ${color === c ? 'text-onPrimaryBg bg-primaryBg ring-4 ring-primary' : 'text-onNeutralBg bg-neutralBg ring-4 ring-onNeutralBg'}`}
//                 onClick={() => handleColorChange(c)}
//                 key={c}
//               >
//                 {c}
//               </a>
//             ))}
//           </div>
//         </div>

//         <div className="mt-10">
//           <p className="block">Enable dark mode:</p>
//           <label className="inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               className="h-6 w-11 rounded-full relative inline-flex items-center"
//               checked={mode === 'dark'}
//               onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
//             />
//             <span className="h-4 w-4 bg-neutralBg rounded-full inline-block transform transition translate-x-1" />
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default Home;
