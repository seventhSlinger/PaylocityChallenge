export interface ITableProps<TValue>{
    headers: Array<string>;
    data: Array<TValue>;    
    keyExtractor: (value: TValue, index: number) => string;
    columns: Array<ITableColumn<TValue>>;
    footerRenderer?: () => JSX.Element;
}
  
export interface ITableColumn<TValue> {
    getValue: (value: TValue) => string;
    customRenderer?: (value: TValue) => JSX.Element;
}