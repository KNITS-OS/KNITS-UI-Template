import { useState } from "react";

import { Col, Row } from "reactstrap";

import { FilterPanel } from "components/panels";
import { InputField, DateField, SelectField } from "components/widgets";

import { documentRatings, DATE_FILTER_FORMAT } from "variables/app.consts";

export const SearchDocumentsFilterPanel = ({ onSearch }) => {
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  const [searchPublishDate, setSearchPublishDate] = useState(undefined);

  const [ratings] = useState(documentRatings);
  const [ratingSelected, setRatingSelected] = useState();

  const resetFilters = () => {
    setSearchAuthor("");
    setSearchPublishDate(undefined);
    setSearchTag("");
    setSearchTitle("");
    setRatingSelected(null);
  };

  const findByAllParameters = () => {
    const searchFilters = parametersToFilter();
    onSearch(searchFilters);
  };

  const parametersToFilter = () => {
    return Object.assign(
      {},
      searchAuthor && searchAuthor !== "" ? { author: searchAuthor } : null,
      searchTag && searchTag !== "" ? { tag: searchTag } : null,
      searchTitle && searchTitle !== "" ? { title: searchTitle } : null,
      searchPublishDate ? { publishDate: searchPublishDate.format(DATE_FILTER_FORMAT) } : null,
      ratingSelected ? { rating: parseInt(ratingSelected.value) } : null
    );
  };

  return (
    <FilterPanel
      title="Search Documents"
      findByAllParameters={findByAllParameters}
      resetFilters={resetFilters}
    >
      <Row>
        <Col md="5">
          <InputField
            placeholder="Title"
            label="Title"
            onChange={e => setSearchTitle(e.target.value)}
            value={searchTitle}
            id="title"
            type="text"
          />
        </Col>
        <Col md="6">
          <InputField
            placeholder="Author"
            label="Author"
            onChange={e => setSearchAuthor(e.target.value)}
            value={searchAuthor}
            id="author"
            type="text"
          />
        </Col>
        <Col md="1">&nbsp;</Col>
      </Row>
      <Row>
        <Col md="3">
          <DateField
            id="creation-date"
            label="Creation Date"
            inputProps={{
              placeholder: "Creation Date",
            }}
            value={searchPublishDate}
            setValue={setSearchPublishDate}
          />
        </Col>
        <Col md="2">
          <SelectField
            id="select-rating"
            label="Rating"
            value={ratingSelected}
            options={ratings}
            onChange={item => {
              setRatingSelected(item);
            }}
          />
        </Col>
        <Col md="6">
          <InputField
            placeholder="Tag"
            label="Tag"
            onChange={e => setSearchTag(e.target.value)}
            value={searchTag}
            id="search-Tag"
            type="text"
          />
        </Col>
        <Col md="1">&nbsp;</Col>
      </Row>

      {/* <FormGroup>
          <label className="form-control-label" htmlFor="rating">
            Rating
          </label>
          <div>
            <Rating
              onClick={newRating => setSearchRating(newRating.toString())}
              initialRating={parseInt(searchRating)}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              className="mt-2"
            />
          </div>
        </FormGroup> */}
    </FilterPanel>
  );
};
