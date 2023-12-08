
import "./SearchBar.css";

export default function SearchBar({
  searchValue,
  setSearchValue,
  placeholder,
}) {
  return (
    <div className="searchBar">
      <i className="material-symbols-rounded searchIcon">search</i>
      <input
        className="searchBarInput"
        type="text"
        placeholder={placeholder} // Use the placeholder prop here
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value.toLowerCase())}
      />
    </div>
  );
}
