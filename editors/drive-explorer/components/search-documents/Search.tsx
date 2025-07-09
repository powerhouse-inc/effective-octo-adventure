import { Button } from "@powerhousedao/design-system";
import { Input } from "@powerhousedao/design-system/ui";
import { useState } from "react";

export interface Search {
  title: string;
  onSearch: (searchTerm: string) => void;
  onClear: () => void;
}

export const Search: React.FC<Search> = ({ title, onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClear = () => {
    setSearchTerm("");
    onClear();
  };

  return (
    <div>
      <h2>{title}</h2>
      <div className="flex gap-x-2">
        <Input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(searchTerm);
            }
          }}
        />
        <Button onClick={() => onSearch(searchTerm)} size="small">
          Search
        </Button>
        <Button onClick={handleClear} size="small">
          Clear
        </Button>
      </div>
    </div>
  );
};
