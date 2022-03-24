import { AnyAction, Dispatch } from "redux";

import { ActionType, SerializedError, typedAction, IUpdated } from "redux/app";

import { Document } from "types";

import { documentService } from ".";

const createDocumentLoading = () =>
  typedAction(ActionType.CREATE_DOCUMENT_LOADING, ActionType.CREATE_DOCUMENT_LOADING);
const searchDocumentLoading = () =>
  typedAction(ActionType.SEARCH_DOCUMENT_LOADING, ActionType.SEARCH_DOCUMENT_LOADING);
const searchDocumentsLoading = () =>
  typedAction(ActionType.SEARCH_DOCUMENTS_LOADING, ActionType.SEARCH_DOCUMENTS_LOADING);
const updateDocumentLoading = () =>
  typedAction(ActionType.UPDATE_DOCUMENT_LOADING, ActionType.UPDATE_DOCUMENT_LOADING);
const deleteDocumentLoading = () =>
  typedAction(ActionType.DELETE_DOCUMENT_LOADING, ActionType.DELETE_DOCUMENT_LOADING);

const createDocumentComplete = (data: Document) =>
  typedAction(ActionType.CREATE_DOCUMENT_COMPLETE, data);
const searchDocumentComplete = (data: Document) =>
  typedAction(ActionType.SEARCH_DOCUMENT_COMPLETE, data);
const searchDocumentsComplete = (data: Document[]) =>
  typedAction(ActionType.SEARCH_DOCUMENTS_COMPLETE, data);
const updateDocumentComplete = (data: Document) =>
  typedAction(ActionType.UPDATE_DOCUMENT_COMPLETE, data);
const deleteDocumentComplete = (data: number) =>
  typedAction(ActionType.DELETE_DOCUMENT_COMPLETE, data);

const createDocumentError = (err: SerializedError) =>
  typedAction(ActionType.CREATE_DOCUMENT_ERROR, err.message);

const searchDocumentError = (err: SerializedError) =>
  typedAction(ActionType.SEARCH_DOCUMENT_ERROR, err.message);

const searchDocumentsError = (err: SerializedError) =>
  typedAction(ActionType.SEARCH_DOCUMENTS_ERROR, err.message);

const updateDocumentError = (err: SerializedError) =>
  typedAction(ActionType.UPDATE_DOCUMENT_ERROR, err.message);

const deleteDocumentError = (err: SerializedError) =>
  typedAction(ActionType.DELETE_DOCUMENT_ERROR, err.message);

export const createDocument = (document: Document) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(createDocumentLoading());

    const { data } = await documentService.createDocument(document);

    dispatch(createDocumentComplete(data));
  } catch (err) {
    dispatch(createDocumentError(err as SerializedError));
  }
};

export const searchDocument = (id: number) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(searchDocumentLoading());

    const { data } = await documentService.getDocumentById(id);
    dispatch(searchDocumentComplete(data));
  } catch (err) {
    dispatch(searchDocumentError(err as SerializedError));
  }
};

export const searchDocuments = (filters: any) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const queryParams = new URLSearchParams(filters);

    dispatch(searchDocumentsLoading());

    const { data } = await documentService.searchDocuments(queryParams);

    dispatch(searchDocumentsComplete(data));
  } catch (err) {
    dispatch(searchDocumentsError(err as SerializedError));
  }
};

export const updateDocument =
  (updatedDocument: IUpdated<Document>) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(updateDocumentLoading());

      const { data } = await documentService.updateDocument(updatedDocument);

      dispatch(updateDocumentComplete(data));
    } catch (err) {
      dispatch(updateDocumentError(err as SerializedError));
    }
  };

export const deleteDocument = (id: number) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(deleteDocumentLoading());

    await documentService.deleteDocument(id);

    dispatch(deleteDocumentComplete(id));
  } catch (err) {
    dispatch(deleteDocumentError(err as SerializedError));
  }
};
