export interface IDataSetmetadata {
    published: boolean,
    title: IStringValue,
    description: IStringValue,
    imageUrl: IStringValue,
    owner: IMetadataPerson,
    contact: IMetadataPerson,
    provenanceInfo: IProvenanceInfo,
    license: IMetadataLicense
}

export interface IBrowseStruc {
    page: number,
    text: string;
}

export interface IStringValue {
    value: string
}

export interface IMetadataPerson {
    name: IStringValue,
    email: IStringValue
}

export interface IProvenanceInfo {
    title: IStringValue,
    body: IStringValue
}

export interface IMetadataLicense {
    uri: string
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

export interface IDetailValuePair {
    key: string,
    value: string
}


export interface IDetailItem {
    notion: string,
    values: string[]
}

export interface ISearchString {
    dataset_id: string,
    page: number
}

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

export interface ISearchValues {
    name: string,
    field: string,
    values: string[]
}

export interface ISearchObject {
    searchvalues: ISearchValues[] | string,
    page: number,
    page_length: number,
    sortorder: string,
    index: string;
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

export interface IFacetValues {
    key: string,
    doc_count: number
}

export interface IFacetCandidate {
    facet: string,
    field: string,
    candidate: string
}

export interface ISendCandidate {
    (data: IFacetCandidate):void
}

export interface ISearchValues {
    name: string,
    field: string,
    values: string[]
}

export interface IResetFacets {
    (): void
}

export interface IRemoveFacet {
    (field: string, value: string): void
}

export interface ISendPage {
    (data: number): void
}

export interface IShowDetail {
    (uri: string): void
}

export interface ICloseDetail {
    (): void
}