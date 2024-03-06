// import { useEffect } from 'react';
// export interface UseScrollProps {
//   isAtTop: boolean;
//   isAtBottom: boolean;
// }

// const useScroll =(elementRef: React.RefObject<HTMLElement>, handleScroll: (props: UseScrollProps) => void)  => {
//   useEffect(() => {
//     const scrollHandler = () => {
//       if (elementRef.current) {
//         const isAtTop = elementRef.current.scrollTop === 0;
//         const isAtBottom =
//           elementRef.current.scrollTop + elementRef.current.clientHeight >=
//           elementRef.current.scrollHeight;

//         handleScroll({ isAtTop, isAtBottom });
//       }
//     };

//     if (elementRef.current) {
//       elementRef.current.addEventListener('scroll', scrollHandler);
//     }

//     return () => {
//       if (elementRef.current) {
//         elementRef.current.removeEventListener('scroll', scrollHandler);
//       }
//     };
//   }, [elementRef, handleScroll]);
// };

// export default useScroll;

import { useEffect } from 'react';

export interface UseScrollProps {
  isAtTop: boolean;
  isAtBottom: boolean;
}

interface UseScrollOptions {
  onFetchData?: () => void;
}

const useScroll = (
  elementRef: React.RefObject<HTMLElement>,
  handleScroll: (props: UseScrollProps) => void,
  options: UseScrollOptions = {},
) => {
  useEffect(() => {
    const scrollHandler = () => {
      if (elementRef.current) {
        const isAtTop = elementRef.current.scrollTop === 0;
        const isAtBottom =
          elementRef.current.scrollTop + elementRef.current.clientHeight >=
          elementRef.current.scrollHeight;

        handleScroll({ isAtTop, isAtBottom });

        // Check if data fetching callback is provided and invoke it when at the bottom
        if (options.onFetchData && isAtBottom) {
          options.onFetchData();
        }
      }
    };

    if (elementRef.current) {
      elementRef.current.addEventListener('scroll', scrollHandler);
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener('scroll', scrollHandler);
      }
    };
  }, [elementRef, handleScroll, options.onFetchData]);
};

export default useScroll;

