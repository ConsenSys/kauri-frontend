import { createCollection, composeCollection, removeCollection, searchCollections } from './collection';
import { searchRequests } from './request';
import { searchArticles } from './article';
import { getAllCuratedList, createCuratedList, editCuratedList, removeCuratedList, addResourceToCuratedList, removeResourceFromCuratedList, addHeaderToCuratedList } from './curatedList';


const queries = {
    createCollection: createCollection,
    composeCollection: composeCollection,
    removeCollection: removeCollection,
    searchCollections: searchCollections,
    searchRequests: searchRequests,
    searchArticles: searchArticles,
    getAllCuratedList: getAllCuratedList,
    createCuratedList: createCuratedList,
    editCuratedList: editCuratedList,
    removeCuratedList: removeCuratedList,
    addResourceToCuratedList: addResourceToCuratedList,
    removeResourceFromCuratedList: removeResourceFromCuratedList,
    addHeaderToCuratedList: addHeaderToCuratedList,
}

export default queries;