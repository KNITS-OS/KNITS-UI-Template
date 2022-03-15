import { useState } from "react";
import CreatableSelect from "react-select/creatable";

import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Row } from "reactstrap";

import { BoxHeader } from "components/headers";
import { InputField, FileInput, DisplayFiles } from "components/widgets";

import { toFileArray } from "pages/utils";

import { defaultBestPracticesTags } from "variables/app.consts";

import { bestPracticeDefaultState } from "..";

export const CreateBestPracticePage = () => {
  const [bestPractice, setBestPractice] = useState(bestPracticeDefaultState);

  const changeFileHandler = event => {
    if (event.currentTarget.files) {
      setBestPractice({
        ...bestPractice,
        contentFiles: toFileArray(event.currentTarget.files),
      });
    }
  };

  const onCreateBestPractice = () => {
    console.log("create best practice", bestPractice);
  };

  const onChangeSelectedTag = newValue => {
    const arrayOfOptions = newValue ? newValue : [];
    const newTags = arrayOfOptions.map(option => option.value);
    const updatedTags = bestPractice.tags ? bestPractice.tags : [];

    newTags.forEach(newTag => {
      if (!updatedTags.includes(newTag)) {
        updatedTags.push(newTag);
      }
    });
    setBestPractice({ ...bestPractice, tags: updatedTags });
  };

  return (
    <>
      {alert}
      <BoxHeader />

      <Container className="mt--6" fluid>
        <Row>
          <Col className="order-xl-1">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <h3 className="mb-0">Best Practices</h3>
                    <p className="text-sm mb-0">Create new</p>
                  </CardHeader>
                  <CardBody>
                    <Row className="justify-content-center">
                      <Col md="10">
                        <InputField
                          id="input-title"
                          label="Title"
                          value={bestPractice.title}
                          onChange={e =>
                            setBestPractice({
                              ...bestPractice,
                              title: e.target.value,
                            })
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md="10">
                        <InputField
                          id="input-description"
                          label="Description"
                          type="textarea"
                          rows="5"
                          value={bestPractice.description}
                          onChange={e =>
                            setBestPractice({
                              ...bestPractice,
                              description: e.target.value,
                            })
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md="10">
                        <FormGroup>
                          <label htmlFor="select-tags" className="form-control-label">
                            Tags
                          </label>
                          <CreatableSelect
                            id="select-tags"
                            isMulti
                            options={defaultBestPracticesTags}
                            onChange={onChangeSelectedTag}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md="10">
                        <InputField
                          id="input-image-url"
                          label="Image Url"
                          value={bestPractice.imageUrl}
                          onChange={e =>
                            setBestPractice({
                              ...bestPractice,
                              imageUrl: e.target.value,
                            })
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md="10">
                        <FileInput id="file-content-upload" onChange={changeFileHandler} />
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md="10">
                        <DisplayFiles files={bestPractice.contentFiles || []} />
                      </Col>
                    </Row>
                    <Row className="mt-3 justify-content-center">
                      <Col md="10" className="d-flex" style={{ justifyContent: "right" }}>
                        <Button color="primary" type="submit" onClick={onCreateBestPractice}>
                          Create
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
