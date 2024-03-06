// import { useEffect, useState } from 'react';
// import { useSearchItemsQuery } from './SearchSlice';
 
// export function useDebouncedSearch( searchparams, delay = 500) {
//   const [debouncedTerm, setDebouncedTerm] = useState(searchparams.variables.search_string);
//   useEffect(() => {
//    // const abortController = new AbortController();
//     const handler = setTimeout(() => {
//       setDebouncedTerm(searchparams.variables.search_string);
//     }, delay);
//     return () => {
//       clearTimeout(handler);
//       //abortController.abort();
//      };
//   }, [searchparams.variables.search_string, delay]);
//   const { data, error, isLoading } = useSearchItemsQuery(debouncedTerm, {
//     skip: !debouncedTerm, // Only run the query if there is a search term
//     //signal: abortController.signal,
//   });
 
//   return { data, error, isLoading };
// }



// //using RTK query

//   //const [queryKey, setQueryKey] = useState<string | null>(null);


//  // useEffect(() => {
//   //   if (debouncedTerm) {
//   //     setQueryKey(`searchItems:${debouncedTerm}`);
//   //   }
//   // }, [debouncedTerm]);
//   // const { data, error, isLoading } = useSearchItemsQuery(queryKey, {
//   //   skip: !queryKey,
//   // });

// useDebouncedSearch.tsx
import { useEffect, useState } from 'react';
import { useSearchItemsQuery } from './SearchSlice';

interface SearchParams {
  queryVariable: string;
  variables: Record<string, any>;
}

export function useDebouncedSearch(searchParams: SearchParams, delay = 500) {
  const { queryVariable, variables } = searchParams;
  const [debouncedTerm, setDebouncedTerm] = useState(variables.search_string);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(variables.search_string);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [variables.search_string, delay]);

  const { data, error, isLoading } = useSearchItemsQuery({
    queryVariable,
    variables: {
      ...variables,
      search_string: debouncedTerm,
    },
  });

  return { data, error, isLoading };
}
