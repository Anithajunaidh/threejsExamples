export const LIST_CENTERUSERS = {
  query: `query listCenterUsers(
    $limit : Int! 
    $page : Int!
    $center_id : Int
    $search_string: String!
    $is_active:Boolean
     $add_super_admin: Boolean
  ){
   listCenterUsers(
    limit: $limit
    page:$page
    center_id : $center_id
    search_string: $search_string
    is_active:$is_active
     add_super_admin:$add_super_admin
  )
    {
        total_records
        listUsers
        {
        id
        first_name
        last_name
        email
        user_type
        dni
        dependance
        user_type_name
        account_no
        center_name
        added_on
        is_guided
        centre_address
        invoice_address
        is_active
        adeudo_reference
        mandato_reference
        mandate_date
        }
       
    }   
}`
};