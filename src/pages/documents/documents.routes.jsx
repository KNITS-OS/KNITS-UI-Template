import {
  DocumentDetailPage,
  DOCUMENT_DETAILS,
  CreateDocumentPage,
  NEW_DOCUMENT,
  SearchDocumentsPage,
  SEARCH_DOCUMENT,
} from ".";

export const documentsMenu = [
  {
    collapse: true,
    name: "Documents",
    icon: "ni ni-compass-04  text-primary",
    state: "documentsCollapse",
    key: "DocumentsMenu",
    path: "DocumentsMenu",

    views: [
      {
        path: NEW_DOCUMENT,
        name: "Create New",
        miniName: "CN",
        component: <CreateDocumentPage />,
        layout: "/admin",
        key: "Document/Create New",
      },
      {
        path: SEARCH_DOCUMENT,
        name: "Search",
        miniName: "S",
        component: <SearchDocumentsPage />,
        layout: "/admin",
        key: "Document/Search",
      },
    ],
  },
  {
    collapse: false,
    global: true,
    path: `${DOCUMENT_DETAILS}/:id`,
    component: <DocumentDetailPage />,
    layout: "/admin",
    key: `Document/${DOCUMENT_DETAILS}/:id`,
  },
];
