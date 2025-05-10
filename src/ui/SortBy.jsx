import PropTypes from "prop-types";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function SortBy({ option }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function hadleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={option}
      type="white"
      onChange={hadleChange}
      value={sortBy}
    />
  );
}

SortBy.propTypes = {
  option: PropTypes.string.isRequired,
};

export default SortBy;
