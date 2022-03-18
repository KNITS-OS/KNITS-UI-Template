import { CreateDocumentPage } from "./create-document";
import { DocumentDetailsPage } from "./document-details";
import { DOCUMENT_DETAILS, DOCUMENT_SEARCH, NEW_DOCUMENT } from "./documents.routes.const";
import { SearchDocumentsPage } from "./search-documents";

export const documentsMenu = [
  {
    collapse: true,
    name: "Documents",
    icon: "ni ni-compass-04 text-primary",
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
        path: DOCUMENT_SEARCH,
        name: "Search",
        miniName: "S",
        component: <SearchDocumentsPage />,
        layout: "/admin",
        key: `Document/${DOCUMENT_SEARCH}`,
      },
    ],
  },
  {
    collapse: false,
    global: true,
    path: `${DOCUMENT_DETAILS}/:id`,
    component: <DocumentDetailsPage />,
    layout: "/admin",
    key: `Document/${DOCUMENT_DETAILS}/:id`,
  },
];
