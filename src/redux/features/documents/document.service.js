import { DOCUMENT_ROUTE, httpCommon } from "redux/app";

const searchDocuments = queryParams => httpCommon.get(`${DOCUMENT_ROUTE}?${queryParams}`);

const getDocumentById = id => httpCommon.get(`${DOCUMENT_ROUTE}/${id}`);

const createDocument = document => httpCommon.post(`${DOCUMENT_ROUTE}`, document);

const updateDocument = updatedDocument => {
  const { id, body } = updatedDocument;
  return httpCommon.put(`${DOCUMENT_ROUTE}/${id}`, body);
};

const deleteDocument = id => httpCommon.delete(`${DOCUMENT_ROUTE}/${id}`);

export const documentService = {
  searchDocuments,
  updateDocument,
  getDocumentById,
  createDocument,
  deleteDocument,
};
