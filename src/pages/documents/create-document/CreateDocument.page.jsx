import { useState } from "react";
import CreatableSelect from "react-select/creatable";

import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Row } from "reactstrap";

import { BoxHeader } from "components/headers";
import { InputField, FileInput, DisplayFiles } from "components/widgets";

import { toFileArray } from "pages/utils";

import { documentService } from "api";
import { useLocalStateAlerts } from "hooks";
import { defaultDocumentsTags } from "variables/app.consts";

import { documentDefaultState } from "..";

export const CreateDocumentPage = () => {
  const [document, setDocument] = useState(documentDefaultState);
  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  const changeFileHandler = event => {
    if (event.currentTarget.files) {
      setDocument({
        ...document,
        contentFiles: toFileArray(event.currentTarget.files),
      });
    }
  };

  const onCreateDocument = async () => {
    // JSON server automatically adds ID to the document
    await documentService.createDocument(document);
    setSuccessMessage("Document Created");
    setSaveSent(true);
    setIsSuccess(true);
  };

  const onChangeSelectedTag = newValue => {
    const arrayOfOptions = newValue ? newValue : [];
    const newTags = arrayOfOptions.map(option => option.value);
    const updatedTags = document.tags ? document.tags : [];

    newTags.forEach(newTag => {
      if (!updatedTags.includes(newTag)) {
        updatedTags.push(newTag);
      }
    });
    setDocument({ ...document, tags: updatedTags });
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
                    <h3 className="mb-0">Documents</h3>
                    <p className="text-sm mb-0">Create new</p>
                  </CardHeader>
                  <CardBody>
                    <Row className="justify-content-center">
                      <Col md="10">
                        <InputField
                          id="input-title"
                          label="Title"
                          value={document.title}
                          onChange={e =>
                            setDocument({
                              ...document,
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
                          value={document.description}
                          onChange={e =>
                            setDocument({
                              ...document,
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
                            options={defaultDocumentsTags}
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
                          value={document.imageUrl}
                          onChange={e =>
                            setDocument({
                              ...document,
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
                        <DisplayFiles files={document.contentFiles || []} />
                      </Col>
                    </Row>
                    <Row className="mt-3 justify-content-center">
                      <Col md="10" className="d-flex" style={{ justifyContent: "right" }}>
                        <Button color="primary" type="submit" onClick={onCreateDocument}>
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
