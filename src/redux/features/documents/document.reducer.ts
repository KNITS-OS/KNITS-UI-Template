import { AnyAction } from "redux";

import { AppActionType, StateType } from "redux/app";

import { Document } from "types";

const initialState: StateType<Document> = {
  entities: [],
  entity: null,
  isLoading: false,
  isSuccess: false,
  error: {},
};

export const documentReducer = (
  documentState = initialState,
  action: AnyAction
): StateType<Document> => {
  const { type, payload } = action;
  const { entities, entity } = documentState;

  let updatedDocuments = [];
  let documentsToKeep = [];

  switch (type) {
    case AppActionType.SEARCH_DOCUMENT_LOADING:
    case AppActionType.SEARCH_DOCUMENTS_LOADING:
    case AppActionType.CREATE_DOCUMENT_LOADING:
    case AppActionType.UPDATE_DOCUMENT_LOADING:
    case AppActionType.DELETE_DOCUMENT_LOADING:
      return {
        isLoading: true,
        isSuccess: false,
        error: {},
        entities,
        entity,
      };

    case AppActionType.SEARCH_DOCUMENT_ERROR:
    case AppActionType.SEARCH_DOCUMENTS_ERROR:
    case AppActionType.CREATE_DOCUMENT_ERROR:
    case AppActionType.UPDATE_DOCUMENT_ERROR:
    case AppActionType.DELETE_DOCUMENT_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        error: payload,
        entities,
        entity,
      };

    case AppActionType.CREATE_DOCUMENT_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: [...documentState.entities, payload],
        entity: payload,
      };

    case AppActionType.SEARCH_DOCUMENT_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: [],
        entity: payload,
      };

    case AppActionType.SEARCH_DOCUMENTS_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: payload,
        entity,
      };

    case AppActionType.UPDATE_DOCUMENT_COMPLETE:
      updatedDocuments = documentState.entities.map(document => {
        if (document.id === payload.id) {
          return {
            ...document,
            ...payload.data,
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

    case AppActionType.DELETE_DOCUMENT_COMPLETE:
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
