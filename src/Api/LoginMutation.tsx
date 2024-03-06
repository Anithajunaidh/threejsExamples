
export const LOGIN_MUTATION = {
  query: `
mutation login(
  $email: String!
  $password: String!            
  ){        
 login(        
    email: $email        
    password: $password            
    ){        
        access_token        
        user_id        
        user_type        
        platform_user_type        
        logged_in_through       
    }       
}
`,};