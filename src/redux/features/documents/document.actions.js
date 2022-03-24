import {
  SEARCH_DOCUMENT_LOADING,
  SEARCH_DOCUMENT_ERROR,
  SEARCH_DOCUMENT_COMPLETE,
  CREATE_DOCUMENT_COMPLETE,
  CREATE_DOCUMENT_ERROR,
  CREATE_DOCUMENT_LOADING,
  DELETE_DOCUMENT_COMPLETE,
  DELETE_DOCUMENT_ERROR,
  DELETE_DOCUMENT_LOADING,
  SEARCH_DOCUMENTS_COMPLETE,
  SEARCH_DOCUMENTS_ERROR,
  SEARCH_DOCUMENTS_LOADING,
  UPDATE_DOCUMENT_COMPLETE,
  UPDATE_DOCUMENT_ERROR,
  UPDATE_DOCUMENT_LOADING,
} from "redux/app";

import { documentService } from ".";

export const createDocument = body => async dispatch => {
  try {
    dispatch({
      type: CREATE_DOCUMENT_LOADING,
      payload: CREATE_DOCUMENT_LOADING,
    });

    const { data } = await documentService.createDocument(body);

    dispatch({
      type: CREATE_DOCUMENT_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({ type: CREATE_DOCUMENT_ERROR, payload: err.message });
  }
};

export const searchDocument = id => async dispatch => {
  try {
    dispatch({
      type: SEARCH_DOCUMENT_LOADING,
      payload: SEARCH_DOCUMENT_LOADING,
    });

    const { data } = await documentService.getDocumentById(id);
    dispatch({
      type: SEARCH_DOCUMENT_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_DOCUMENT_ERROR,
      payload: err.message,
    });
  }
};

export const searchDocuments = filters => async dispatch => {
  try {
    const queryParams = new URLSearchParams(filters);

    dispatch({
      type: SEARCH_DOCUMENTS_LOADING,
      payload: SEARCH_DOCUMENTS_LOADING,
    });

    const { data } = await documentService.searchDocuments(queryParams);

    dispatch({
      type: SEARCH_DOCUMENTS_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_DOCUMENTS_ERROR,
      payload: err.message,
    });
  }
};

export const updateDocument = (id, body) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_DOCUMENT_LOADING,
      payload: UPDATE_DOCUMENT_LOADING,
    });

    const { data } = await documentService.updateDocument(id, body);

    dispatch({
      type: UPDATE_DOCUMENT_COMPLETE,
      payload: { id, data },
    });
  } catch (err) {
    dispatch({ type: UPDATE_DOCUMENT_ERROR, payload: err.message });
  }
};

export const deleteDocument = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_DOCUMENT_LOADING,
      payload: DELETE_DOCUMENT_LOADING,
    });

    await documentService.deleteDocument(id);

    dispatch({
      type: DELETE_DOCUMENT_COMPLETE,
      payload: { id },
    });
  } catch (err) {
    dispatch({ type: DELETE_DOCUMENT_ERROR, payload: err.message });
  }
};
