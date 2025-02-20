"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const active = searchParam.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParam);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button filter="all" handleFilter={handleFilter} activeFilter={active}>
        All cabins
      </Button>

      <Button filter="small" handleFilter={handleFilter} activeFilter={active}>
        1&mdash;3 guests
      </Button>

      <Button filter="medium" handleFilter={handleFilter} activeFilter={active}>
        4&mdash;7 guests
      </Button>

      <Button filter="large" handleFilter={handleFilter} activeFilter={active}>
        8&mdash;15 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-800" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
