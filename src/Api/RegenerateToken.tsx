
export const REGENERATE_TOKEN = {
  query: `
  mutation generateAccessTokenFromToken(
    $token: String!
    ){
   generateAccessTokenFromToken(
      token: $token
      )
}
`,};