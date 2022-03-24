import { createSelector } from "reselect";

import { RootState } from "redux/app";

export const selectDocumentsState = (rootState: RootState) => rootState.document;

export const selectAllDocumentsData = createSelector(
  [selectDocumentsState],
  documentState => documentState.entities
);

export const selectDocumentById = (id: number) =>
  createSelector([selectAllDocumentsData], documentsData =>
    documentsData.find(document => document.id === id)
  );
