// 'use client'
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'

// export default function Error({
//   error,
//   reset,
// }: {
//   error: { errors: { message: string; locations: { line: number; column: number }[]; code: number }[] };
//   reset: () => void
// }) {
//   const router = useRouter();
//   const [errorState, setErrorState] = useState(error);

  
//   useEffect(() => {
//     // Log "hello" to the console
//     setErrorState(error);
//     console.log("hello");

//     // Assuming you want to log the first error in the array
//     console.error("Error Message:", errorState?.errors[0]?.message);
//     console.error("Location:", errorState?.errors[0]?.locations[0]);
//     console.error("Error Code:", errorState?.errors[0]?.code);
//   }, [errorState]);

//   const errorCode = errorState?.errors[0]?.code || 500;
//   return (
//     <div>
//       <h2>Something went wrong!</h2>
//       {errorCode && (
//         <div>
//           {(() => {
//             switch (errorCode) {
//               case 401:
//                 return (
//                   <div>
//                     <p>Authentication failed!</p>
//                     {/* Uncomment the following line if you want to navigate to the login page on click */}
//                     {/* <button onClick={() => router.push("/login")}>Login</button> */}
//                   </div>
//                 );
//               case 131: // Assuming this is your custom error code
//                 return (
//                   <div>
//                     <p>{error.message}</p>
//                     <button onClick={reset}>Try again</button>
//                   </div>
//                 );
//               default:
//                 return (
//                   <div>
//                     <p>We apologize for the inconvenience.</p>
//                     <button onClick={() => router.push("/")}>Go back to the home page</button>
//                   </div>
//                 );
//             }
//           })()}
//         </div>
//       )}
//     </div>
//   );
// }


'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Check if the error is an invalid password error
    if (error.message === 'Invalid password') {
      // Display a custom error message to the user
      alert('Invalid password. Please try again.')
    }

    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}