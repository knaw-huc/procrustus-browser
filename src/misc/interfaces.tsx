export interface ICollection {
    collection: string,
    collection_id: string,
    label: string
}

export interface IDataSet {
    dataSet: string,
    label: string,
    indexes: ICollection[]
}

export interface IStore {
    dataSets: IDataSet[]
}

export interface IDetails {
    title: string,
    uri: string,
    items: IDetailItem[]
}

export interface IDetailItem {
    notion: string,
    label: string,
    uri: string,
    values: IDetailValue[],
    type: string
}

export interface ISameAsList {
    items: IDetailItem
}

export interface IDetailValue {
    value: string,
    link?: ILink
}

export interface ILink {
    dataset: string,
    collection: string,
    uri: string
}

export interface IParameter {
    code: string;
}

export interface IBrowseResult {
    total_hits: number
    page: number,
    total_pages: number,
    dataset_name: string,
    dataset_id: string,
    items: IBrowseItem[],
}

export interface IBrowseItem {
    head: string,
    body: string[],
    uri: string;
}

export interface IDetailBrowseItem {
    head: string,
    body: string[],
    uri: string,
    index: string
}


export interface ISearchValues {
    name: string,
    field: string,
    values: string[]
}

export interface ISearchObject {
    searchvalues: ISearchValues[],
    page: number,
    page_length: number,
    sortorder: string,
    collection_index: string;
}

export interface ISearchParams {
    dataset: string,
    collection: string,
    collection_index: string,
    page: number,
    searchvalues: ISearchValues[]
}

export interface ICollection {
    collection: string,
    collection_id: string,
    label: string
}

export interface IResetFacets {
    (): void
}

export interface IRefresh {
    (): void;
}

export interface IRemoveFacet {
    (field: string, value: string): void
}

export interface ISendPage {
    (data: number): void
}

export interface IFacetCandidate {
    facet: string,
    field: string,
    candidate: string
}



export interface IBrowseStruc {
    page: number,
    text: string;
}

export interface ISendCandidate {
    (data: IFacetCandidate):void
}

export interface IFacet {
    facet: string,
    value: string
}

export interface IResultList {
    amount: number,
    pages: number,
    items: IResult[]
}

export interface IResult {
    uri: string,
    title: string
}

export interface IShowDetail {
    (uri: string): void
}

export interface ICollectionProps {
    uri: string,
    shortenedUri: string
    properties: IPropsItems[]
}

export interface IPropsItems {
    uri: string,
    shortenedUri: string,
    density: number
}

export interface IDatasetCollections {
    dataSetId: string,
    dataSetName: string,
    items: IDatasetCollectionProps[]
}

export interface IDatasetCollectionProps {
    collectionId: string,
    collectionListId: string,
    shortenedUri: string,
    itemType: string,
    total: number,
    title: string
}

export interface ITitle {
    value: string
}

export interface IMetaData  {
    title: string,
    description: string[],
    imageUrl: string,
    license: string,
    publisher: string,
    creator: string,
    contributor: string,
    dataProvider: string,
    subject: string,
    source: string,
    created: string,
    modified: string,
    sparqlEndpoint: string
}

export interface IMetaDataListItem {
    dataset: string,
    metadata: IMetaData
}

export interface IStoreIndexes {
    dataset: number,
    collection: number
}

