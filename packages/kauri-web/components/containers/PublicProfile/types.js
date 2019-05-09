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
  isLoggedIn?: boolean,
  openModalAction?: ({ children: any }) => void,
};

export type CollectionsProps = {
  isLoggedIn?: boolean,
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
  userId?: string,
  saveUserDetailsAction: () => void,
  currentUser?: string,
  deleteDraftArticleAction: (
    payload: { id: string, version: number },
    callback: () => void
  ) => void,
  closeModalAction: () => void,
  openModalAction: (payload: any) => void,
  hostName: string,
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
      communities: { id: string, name: string }[],
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
  hostName: string,
  title: string,
  avatar: string,
  website: string,
  twitter: string,
  github: string,
  name: string,
  toggleEditing: () => void,
  id?: string,
  currentUser?: string,
  collections?: CollectionsProps,
  articles?: ArticlesProps,
};
