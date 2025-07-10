import { Search } from "./search-documents/Search.js";
import { DynamicTable } from "./search-documents/SearchResult.js";
import { useState } from "react";
import { useTypedQuery } from "../hooks/index.js";

type ContentProps = {
  searchTerm: string;
};

type QueryResult = {
  document_id: string;
  name: string | null;
  content: string | null;
};

const Content = ({ searchTerm }: ContentProps) => {
  const {
    isLoading: scopeLoading,
    error: scopeError,
    result: scopeResult,
  } = useTypedQuery(
    (db, params) => {
      return db
        .selectFrom("atlas_scope_docs")
        .selectAll()
        .where("content", "ilike", `%${params.searchTerm}%`)
        .compile();
    },
    { searchTerm },
  );

  console.log("scopeResult", scopeResult);
  const {
    isLoading: foundationLoading,
    error: foundationError,
    result: foundationResult,
  } = useTypedQuery(
    (db, params) => {
      return db
        .selectFrom("atlas_foundation_docs")
        .selectAll()
        .where("content", "ilike", `%${params.searchTerm}%`)
        .compile();
    },
    { searchTerm },
  );

  if (scopeLoading || foundationLoading) {
    return <div>Loading...</div>;
  }

  if (scopeError || foundationError) {
    return <div>Error fetching data</div>;
  }

  if (
    (!scopeResult || scopeResult.rows.length === 0) &&
    (!foundationResult || foundationResult.rows.length === 0)
  ) {
    return <div>No results found</div>;
  }

  const data = [
    ...(scopeResult?.rows || []),
    ...(foundationResult?.rows || []),
  ];

  return (
    <DynamicTable<QueryResult>
      headers={["DocID", "Name", "Content"]}
      data={data}
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
