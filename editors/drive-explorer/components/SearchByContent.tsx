import { Search } from "./search-documents/Search.js";
import { DynamicTable } from "./search-documents/SearchResult.js";
import { useState } from "react";
import { useTypedQuery } from "../hooks/index.js";

type ContentProps = {
  searchTerm: string;
};

const Content = ({ searchTerm }: ContentProps) => {
  const { isLoading, error, result } = useTypedQuery(
    (db, params) => {
      return db
        .selectFrom("atlas_scope_docs")
        .selectAll()
        .where("content", "like", `%${params.searchTerm}%`)
        .compile();
    },
    { searchTerm },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  if (!result || result.rows.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <DynamicTable<(typeof result.rows)[0]>
      headers={["DocID", "Name", "Content"]}
      data={result.rows}
      renderRow={(row, index) => (
        <>
          <td>{row.document_id}</td>
          <td>{row.name}</td>
          <td>{row.content}</td>
        </>
      )}
    />
  );
};

export const SearchByContent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Search
        title="Search by content"
        onSearch={setSearchTerm}
        onClear={() => setSearchTerm("")}
      />
      {searchTerm && (
        <div className="mt-4">
          <Content searchTerm={searchTerm} />
        </div>
      )}
    </div>
  );
};
