import { Document } from "types";

import { httpCommon, DOCUMENT_ROUTE, HttpResponseType } from "..";

const searchDocuments = (queryParams: URLSearchParams): HttpResponseType =>
  httpCommon.get(`${DOCUMENT_ROUTE}?${queryParams}`);

const getDocumentById = (id: number): HttpResponseType => httpCommon.get(`${DOCUMENT_ROUTE}/${id}`);

const createDocument = (document: Document): HttpResponseType =>
  httpCommon.post(`${DOCUMENT_ROUTE}`, document);

const deleteDocument = (id: number): HttpResponseType =>
  httpCommon.delete(`${DOCUMENT_ROUTE}/${id}`);

export const documentService = {
  searchDocuments,
  getDocumentById,
  createDocument,
  deleteDocument,
};
