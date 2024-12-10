export function extractData<T>(data: any[], accessor: (item: any) => T): T[] {
    return data.flatMap((item) => {
      const value = accessor(item);
      return Array.isArray(value) ? value : [value];
    }).filter(Boolean);
  }
  