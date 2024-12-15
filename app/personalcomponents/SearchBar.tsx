import React, { useState } from "react";
import { Comboboxsearch } from "~/components/ui/comboboxsearch";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ISearchBarProps } from "~/interfaces/SearchBarInterface";

const SearchBar: React.FC<ISearchBarProps> = ({
  frameworks,
  handleSearchSubmit,
  inputText,
  setInputText,
}) => {
  return (
    <div className="flex items-center space-x-2 w-2/4 justify-end text-right">
      <Comboboxsearch frameworks={frameworks} />
      <Input
        type="text"
        placeholder="Search"
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchSubmit();
          }
        }}
        value={inputText}
        className="bg-white text-black font-normal"
      />
      <Button
        type="submit"
        className="flex-shrink-0 hover:bg-gray-700 text-white rounded bg-gray-600"
        onClick={() => handleSearchSubmit()}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
