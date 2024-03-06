import React from "react";
interface SearchFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ value, onChange }) => {
  return (
    <div className="search-field">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default React.memo(SearchField);



