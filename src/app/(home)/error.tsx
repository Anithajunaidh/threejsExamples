'use client' // Error components must be Client Components
 
import router from 'next/router'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  const errorCode = error?.statusCode||500;
  return (
    <div>
    <h2>Something went wrong!</h2>
    {errorCode && (
      <div>
        {(() => {
          switch (errorCode) {
            case 401:
              return (
                <div>
                  <p>Authentication failed!</p>
                  {/* <button onClick={() => router.push("/login")}>Login</button> */}
                </div>
              );
            case 131:
              return (
                <div>
                  <p>invalid password!</p>
                  <button onClick={() => reset()}>Try again</button>
                </div>
              );
            default:
              return (
                <div>
                  <p>We apologize for the inconvenience.</p>
                  <button onClick={() => router.push("/")}>Go back to the home page</button>
                </div>
              );
          }
        })()}
      </div>
    )}
  </div>
  )
}