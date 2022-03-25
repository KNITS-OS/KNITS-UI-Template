import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { AppActionType, SerializedError, typedAction, IUpdated } from "redux/app";

import { Document, DocumentSaveRequest } from "types";

import { documentService } from ".";

const createDocumentLoading = () =>
  typedAction(AppActionType.CREATE_DOCUMENT_LOADING, AppActionType.CREATE_DOCUMENT_LOADING);
const searchDocumentLoading = () =>
  typedAction(AppActionType.SEARCH_DOCUMENT_LOADING, AppActionType.SEARCH_DOCUMENT_LOADING);
const searchDocumentsLoading = () =>
  typedAction(AppActionType.SEARCH_DOCUMENTS_LOADING, AppActionType.SEARCH_DOCUMENTS_LOADING);
const updateDocumentLoading = () =>
  typedAction(AppActionType.UPDATE_DOCUMENT_LOADING, AppActionType.UPDATE_DOCUMENT_LOADING);
const deleteDocumentLoading = () =>
  typedAction(AppActionType.DELETE_DOCUMENT_LOADING, AppActionType.DELETE_DOCUMENT_LOADING);

const createDocumentComplete = (data: Document) =>
  typedAction(AppActionType.CREATE_DOCUMENT_COMPLETE, data);
const searchDocumentComplete = (data: Document) =>
  typedAction(AppActionType.SEARCH_DOCUMENT_COMPLETE, data);
const searchDocumentsComplete = (data: Document[]) =>
  typedAction(AppActionType.SEARCH_DOCUMENTS_COMPLETE, data);
const updateDocumentComplete = (data: Document) =>
  typedAction(AppActionType.UPDATE_DOCUMENT_COMPLETE, data);
const deleteDocumentComplete = (data: number) =>
  typedAction(AppActionType.DELETE_DOCUMENT_COMPLETE, data);

const createDocumentError = (err: SerializedError) =>
  typedAction(AppActionType.CREATE_DOCUMENT_ERROR, err);

const searchDocumentError = (err: SerializedError) =>
  typedAction(AppActionType.SEARCH_DOCUMENT_ERROR, err);

const searchDocumentsError = (err: SerializedError) =>
  typedAction(AppActionType.SEARCH_DOCUMENTS_ERROR, err);

const updateDocumentError = (err: SerializedError) =>
  typedAction(AppActionType.UPDATE_DOCUMENT_ERROR, err);

const deleteDocumentError = (err: SerializedError) =>
  typedAction(AppActionType.DELETE_DOCUMENT_ERROR, err);

export type DocumentActionType = ActionType<
  | typeof createDocumentLoading
  | typeof searchDocumentLoading
  | typeof searchDocumentsLoading
  | typeof updateDocumentLoading
  | typeof deleteDocumentLoading
  | typeof createDocumentComplete
  | typeof searchDocumentComplete
  | typeof searchDocumentsComplete
  | typeof updateDocumentComplete
  | typeof deleteDocumentComplete
  | typeof createDocumentError
  | typeof searchDocumentError
  | typeof searchDocumentsError
  | typeof updateDocumentError
  | typeof deleteDocumentError
>;

export const createDocument =
  (document: DocumentSaveRequest) => async (dispatch: Dispatch<DocumentActionType>) => {
    try {
      dispatch(createDocumentLoading());

      const { data } = await documentService.createDocument(document);

      dispatch(createDocumentComplete(data));
    } catch (err) {
      dispatch(createDocumentError(err as SerializedError));
    }
  };

export const searchDocument = (id: number) => async (dispatch: Dispatch<DocumentActionType>) => {
  try {
    dispatch(searchDocumentLoading());

    const { data } = await documentService.getDocumentById(id);
    dispatch(searchDocumentComplete(data));
  } catch (err) {
    dispatch(searchDocumentError(err as SerializedError));
  }
};

export const searchDocuments = (filters: any) => async (dispatch: Dispatch<DocumentActionType>) => {
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
  (updatedDocument: IUpdated<Document>) => async (dispatch: Dispatch<DocumentActionType>) => {
    try {
      dispatch(updateDocumentLoading());

      const { data } = await documentService.updateDocument(updatedDocument);

      dispatch(updateDocumentComplete(data));
    } catch (err) {
      dispatch(updateDocumentError(err as SerializedError));
    }
  };

export const deleteDocument = (id: number) => async (dispatch: Dispatch<DocumentActionType>) => {
  try {
    dispatch(deleteDocumentLoading());

    await documentService.deleteDocument(id);

    dispatch(deleteDocumentComplete(id));
  } catch (err) {
    dispatch(deleteDocumentError(err as SerializedError));
  }
};
