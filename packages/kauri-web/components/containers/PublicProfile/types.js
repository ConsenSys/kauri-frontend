// @flow

export type ArticlesProps = {
  type?: "toBeApproved" | "published" | "draft" | "pending",
  data: {
    searchArticles: {
      content: Array<ArticleDTO>,
    },
  },
  routeChangeAction: () => void,
  isOwner: boolean,
};

export type CollectionsProps = {
  data: {
    searchCollections: {
      content: Array<CollectionDTO>,
    },
  },
  routeChangeAction: () => void,
};

export type ViewState = {
  isEditing?: boolean,
  avatar: string,
  username: string,
  name: string,
  title: string,
  website: string,
  twitter: string,
  github: string,
};

export type ViewProps = {
  saveUserDetailsAction: () => void,
  currentUser?: string,
  deleteDraftArticleAction: (
    payload: { id: string, version: number },
    callback: () => void
  ) => void,
  closeModalAction: () => void,
  openModalAction: (payload: any) => void,
  ArticlesQuery: {
    searchArticles: {
      content: Array<ArticleDTO>,
    },
  },
  DraftsQuery: {
    searchArticles: {
      content: Array<ArticleDTO>,
    },
  },
  PendingQuery: {
    searchArticles: {
      content: Array<ArticleDTO>,
    },
  },
  ApprovalsQuery: {
    searchArticles: {
      content: Array<ArticleDTO>,
    },
  },
  CollectionQuery: {
    searchCollections: {
      content: Array<CollectionDTO>,
    },
  },
  UserQuery: {
    getUser: {
      id: string,
      avatar: string,
      username: string,
      name: string,
      title: string,
      website: string,
      social: {
        twitter: string,
        github: string,
      },
    },
  },
  routeChangeAction: () => void,
};

export type HeaderState = {
  username: string,
  title: string,
  avatar: string,
  website: string,
  twitter: string,
  github: string,
  name: string,
};

export type HeaderProps = {
  username: string,
  title: string,
  avatar: string,
  website: string,
  twitter: string,
  github: string,
  name: string,
  saveUserAction: HeaderState => void,
  toggleEditing: () => void,
  updateHeader: HeaderState => void,
  id?: string,
  currentUser?: string,
  collections?: CollectionsProps,
  articles?: ArticlesProps,
};
