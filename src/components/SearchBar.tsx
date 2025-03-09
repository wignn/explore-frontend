"use client";

import { IoSearch } from "react-icons/io5";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 50);
  

  return (
    <div className="flex justify-center items-center">
      <div className="relative flex items-center max-w-96 w-full border-2 border-gray-700 bg-gray-800 shadow-lg rounded-lg">
        <IoSearch className="absolute left-3 inset-y-0 my-auto h-5 w-5 text-gray-400" />
        <input
          type="text"
          className="w-full bg-transparent py-2 pl-10 pr-4 text-sm text-white outline-none rounded-lg placeholder-gray-400"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>
    </div>
  );
};

export default Search;