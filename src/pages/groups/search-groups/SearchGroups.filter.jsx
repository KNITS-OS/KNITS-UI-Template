import { FilterPanel } from "components/panels";

export const SearchGroupsFilter = ({ onSearch }) => {
  const resetFilters = () => {};

  const findByAllParameters = () => {
    const filters = {};
    onSearch(filters);
  };

  return (
    <FilterPanel
      title="Search Groups"
      findByAllParameters={findByAllParameters}
      resetFilters={resetFilters}
    >
      {/* @todo add active filter, etc */}
    </FilterPanel>
  );
};
