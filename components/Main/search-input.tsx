export default function SearchInput() {
  return (
    <form className="max-w-md mx-auto">
      <label className="mb-2 text-sm font-medium text-gray-500 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-3 h-3 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="search"
          id="default-search"
          className="block w-[332px] h-[47px] p-3 ps-10 ps text-sm text-gray-500 border border-gray-300 rounded-lg bg-[#f8f8f8]"
          placeholder="Search by ID, PNR, eTicket.."
          required
        />
      </div>
    </form>
  );
}
