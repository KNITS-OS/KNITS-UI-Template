/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Col, Container, Row } from "reactstrap";

import { BoxHeader } from "components/headers";
import { ReactTable } from "components/widgets";

import { bestPracticesData } from "data";

import { BEST_PRACTICE_DETAILS } from "../best-practices.routes.const";
import { BestPracticeHighlightsPanel } from "../panels";

import { bestPracticesTableColumns, SearchBestPracticesFilterPanel } from ".";

export const SearchBestPracticesPage = () => {
  const navigate = useNavigate();

  const [alert] = useState(null);

  const [bestPractices] = useState(bestPracticesData);

  const onSearchBestPractices = filters => {
    console.log("searchBestPractices", filters);
  };

  const onDeleteBestPractice = e => {
    e.preventDefault();
    const { id } = e.currentTarget;
    console.log("deleteBestPractice", id);
  };

  const onViewBestPracticeDetails = e => {
    const { id } = e.currentTarget;
    navigate(`/admin${BEST_PRACTICE_DETAILS}/${id}`);
  };

  return (
    <>
      {alert}
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="12">
            <BestPracticeHighlightsPanel onViewDetailsClick={onViewBestPracticeDetails} />
          </Col>
        </Row>

        <Row>
          <div className="col">
            <SearchBestPracticesFilterPanel onSearch={onSearchBestPractices} />
          </div>
        </Row>

        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Search results</h3>
              </CardHeader>

              <ReactTable
                data={bestPractices}
                columns={bestPracticesTableColumns({
                  onDetailsButtonClick: onViewBestPracticeDetails,
                  onRemoveButtonClick: onDeleteBestPractice,
                })}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
