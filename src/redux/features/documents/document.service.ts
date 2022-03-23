import { Document } from "types";

import { httpCommon, DOCUMENT_ROUTE, HttpResponseType, IUpdated } from "../../app";

const searchDocuments = (queryParams: URLSearchParams): HttpResponseType<Document> =>
  httpCommon.get(`${DOCUMENT_ROUTE}?${queryParams}`);

const getDocumentById = (id: number): HttpResponseType<Document> =>
  httpCommon.get(`${DOCUMENT_ROUTE}/${id}`);

const createDocument = (document: Document): HttpResponseType<Document> =>
  httpCommon.post(`${DOCUMENT_ROUTE}`, document);

const updateDocument = (updatedDocument: IUpdated<Document>): HttpResponseType<Document> => {
  const { id, body } = updatedDocument;
  return httpCommon.put(`${DOCUMENT_ROUTE}/${id}`, body);
};

const deleteDocument = (id: number): HttpResponseType<Document> =>
  httpCommon.delete(`${DOCUMENT_ROUTE}/${id}`);

export const documentService = {
  searchDocuments,
  updateDocument,
  getDocumentById,
  createDocument,
  deleteDocument,
};
