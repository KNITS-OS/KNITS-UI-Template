import { AppActionType, typedAction } from "redux/app";

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

const createDocumentComplete = data => typedAction(AppActionType.CREATE_DOCUMENT_COMPLETE, data);
const searchDocumentComplete = data => typedAction(AppActionType.SEARCH_DOCUMENT_COMPLETE, data);
const searchDocumentsComplete = data => typedAction(AppActionType.SEARCH_DOCUMENTS_COMPLETE, data);
const updateDocumentComplete = data => typedAction(AppActionType.UPDATE_DOCUMENT_COMPLETE, data);
const deleteDocumentComplete = data => typedAction(AppActionType.DELETE_DOCUMENT_COMPLETE, data);

const createDocumentError = err => typedAction(AppActionType.CREATE_DOCUMENT_ERROR, err);

const searchDocumentError = err => typedAction(AppActionType.SEARCH_DOCUMENT_ERROR, err);

const searchDocumentsError = err => typedAction(AppActionType.SEARCH_DOCUMENTS_ERROR, err);

const updateDocumentError = err => typedAction(AppActionType.UPDATE_DOCUMENT_ERROR, err);

const deleteDocumentError = err => typedAction(AppActionType.DELETE_DOCUMENT_ERROR, err);

export const createDocument = document => async dispatch => {
  try {
    dispatch(createDocumentLoading());

    const { data } = await documentService.createDocument(document);

    dispatch(createDocumentComplete(data));
  } catch (err) {
    dispatch(createDocumentError(err));
  }
};

export const searchDocument = id => async dispatch => {
  try {
    dispatch(searchDocumentLoading());

    const { data } = await documentService.getDocumentById(id);
    dispatch(searchDocumentComplete(data));
  } catch (err) {
    dispatch(searchDocumentError(err));
  }
};

export const searchDocuments = filters => async dispatch => {
  try {
    const queryParams = new URLSearchParams(filters);

    dispatch(searchDocumentsLoading());

    const { data } = await documentService.searchDocuments(queryParams);

    dispatch(searchDocumentsComplete(data));
  } catch (err) {
    dispatch(searchDocumentsError(err));
  }
};

export const updateDocument = updatedDocument => async dispatch => {
  try {
    dispatch(updateDocumentLoading());

    const { data } = await documentService.updateDocument(updatedDocument);

    dispatch(updateDocumentComplete(data));
  } catch (err) {
    dispatch(updateDocumentError(err));
  }
};

export const deleteDocument = id => async dispatch => {
  try {
    dispatch(deleteDocumentLoading());

    await documentService.deleteDocument(id);

    dispatch(deleteDocumentComplete(id));
  } catch (err) {
    dispatch(deleteDocumentError(err));
  }
};
