import { createSelector } from "reselect";

export const selectDocumentsState = rootState => rootState.document;

export const selectAllDocumentsData = createSelector(
  [selectDocumentsState],
  documentState => documentState.entities
);

export const selectDocumentById = id =>
  createSelector([selectAllDocumentsData], documentsData =>
    documentsData.find(document => document.id === id)
  );
