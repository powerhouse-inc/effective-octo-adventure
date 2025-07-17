import { Search } from "./search-documents/Search.js";
import { DynamicTable } from "./search-documents/SearchResult.js";
import { useState } from "react";
import { useTypedQuery } from "../hooks/index.js";

type ContentProps = {
  searchTerm: string;
  driveId: string;
};

const Content = ({ searchTerm, driveId }: ContentProps) => {
  const { isLoading, error, result } = useTypedQuery(
    driveId,
    (db, params) => {
      return db
        .selectFrom("atlas_foundation_docs")
        .selectAll()
        .where("parent_id", "=", params.searchTerm)
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

export type SearchByScopeProps = {
  driveId: string;
};

export const SearchByScope = ({ driveId }: SearchByScopeProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Search
        title="Search by scope"
        onSearch={setSearchTerm}
        onClear={() => setSearchTerm("")}
      />
      {searchTerm && (
        <div className="mt-4">
          <Content searchTerm={searchTerm} driveId={driveId} />
        </div>
      )}
    </div>
  );
};
