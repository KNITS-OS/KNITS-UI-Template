import {
  CREATE_DOCUMENT_COMPLETE,
  CREATE_DOCUMENT_ERROR,
  CREATE_DOCUMENT_LOADING,
  DELETE_DOCUMENT_COMPLETE,
  DELETE_DOCUMENT_ERROR,
  DELETE_DOCUMENT_LOADING,
  SEARCH_DOCUMENTS_BY_IDS_COMPLETE,
  SEARCH_DOCUMENTS_BY_IDS_ERROR,
  SEARCH_DOCUMENTS_BY_IDS_LOADING,
  SEARCH_DOCUMENTS_COMPLETE,
  SEARCH_DOCUMENTS_ERROR,
  SEARCH_DOCUMENTS_LOADING,
  SEARCH_DOCUMENT_COMPLETE,
  SEARCH_DOCUMENT_ERROR,
  SEARCH_DOCUMENT_LOADING,
  UPDATE_DOCUMENT_COMPLETE,
  UPDATE_DOCUMENT_ERROR,
  UPDATE_DOCUMENT_LOADING,
} from "redux/app";

const initialState = {
  entities: [],
  entity: null,
  isLoading: false,
  isSuccess: false,
  error: {},
};

export const documentReducer = (documentState = initialState, action = {}) => {
  const { type, payload } = action;
  const { entities, entity } = documentState;

  let updatedDocuments = [];
  let documentsToKeep = [];

  switch (type) {
    case SEARCH_DOCUMENT_LOADING:
    case SEARCH_DOCUMENTS_LOADING:
    case SEARCH_DOCUMENTS_BY_IDS_LOADING:
    case CREATE_DOCUMENT_LOADING:
    case UPDATE_DOCUMENT_LOADING:
    case DELETE_DOCUMENT_LOADING:
      return {
        isLoading: true,
        isSuccess: false,
        error: {},
        entities,
        entity,
      };

    case SEARCH_DOCUMENT_ERROR:
    case SEARCH_DOCUMENTS_ERROR:
    case SEARCH_DOCUMENTS_BY_IDS_ERROR:
    case CREATE_DOCUMENT_ERROR:
    case UPDATE_DOCUMENT_ERROR:
    case DELETE_DOCUMENT_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        error: payload,
        entities,
        entity,
      };

    case CREATE_DOCUMENT_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: [...documentState.entities, payload],
        entity: payload,
      };

    case SEARCH_DOCUMENT_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: [],
        entity: payload,
      };

    case SEARCH_DOCUMENTS_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: payload,
        entity,
      };

    case SEARCH_DOCUMENTS_BY_IDS_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: payload,
        entity,
      };

    case UPDATE_DOCUMENT_COMPLETE:
      updatedDocuments = documentState.entities.map(document => {
        if (document.id === payload.id) {
          return {
            ...document,
            ...payload,
          };
        }
        return document;
      });

      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: updatedDocuments,
        entity: payload.data,
      };

    case DELETE_DOCUMENT_COMPLETE:
      documentsToKeep = documentState.entities.filter(({ id }) => id !== parseInt(payload.id));

      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: documentsToKeep,
        entity,
      };

    default:
      return documentState;
  }
};
