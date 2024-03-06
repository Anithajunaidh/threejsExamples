'use client';
import React, {useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "@/components/DynamicTable";
import SearchField from "@/components/SearchField";
import { LIST_CENTERUSERS } from "@/Api/CenterUserQuery";
import { CircularProgress } from "@mui/material";
import { useDebouncedSearch } from "@/store/DebouncedHook";

const CenterUser: React.FC = () => {
  const [page,setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const queryVariable = LIST_CENTERUSERS.query;
  const additionalVariables = {
    search_string: searchTerm,
    limit: 10,
    page,
    is_active: false,
    addSuperAdmin: false,
  };
  const { data,isLoading, isError, error  } = useDebouncedSearch({queryVariable,variables: additionalVariables});

  const filteredData = data?.data?.listCenterUsers?.listUsers;
  const totalRecords=data?.data?.listCenterUsers?.total_records;
  const headers = [
    { title: "ID", field: "id" },
    { title: "First Name", field: "first_name" },
    { title: "Last Name", field: "last_name" },
    { title: "Email", field: "email" },
    { title: "User Type", field: "user_type_name" },
    // Add more columns as needed
  ];

  const canEdit = true;
  const canDelete = true;

  const actions = [
    canEdit
      ? { label: "Edit", actionType: "edit", icon: <EditIcon /> }
      : null,
    canDelete
      ? { label: "Delete", actionType: "delete", icon: <DeleteIcon /> }
      : null,
  ].filter(Boolean);


  const handleClick = (actionType: string, id: number) => {
    switch (actionType) {
      case "edit":
        console.log("Edit ID:", id);
        break;
      case "delete":
        console.log("Delete ID:", id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h1>Data Table</h1>
      <div>
      <SearchField
        value={searchTerm}
        onChange={(e) => {
          const newSearchTerm = e.target.value;
          console.log('Search term changed:', newSearchTerm);
          setSearchTerm(newSearchTerm); // Update the local state
          setPage(1);
        }}
      />
      </div>
      <div className="p-10">
{isError && <div>Error:Unable to fetch data. Please try again later.</div>}
      {isLoading ? (
        <CircularProgress />
      ) : (
      <DataTable
        data={filteredData}
        actions={actions}
        headers={headers}
        handleClick={handleClick}
        page={page}
        setPage={setPage}
        totalRecords={totalRecords}
        rowsPerPage={10}
      />
       )} 
      </div>
    </div>
  );
};

export default CenterUser;
