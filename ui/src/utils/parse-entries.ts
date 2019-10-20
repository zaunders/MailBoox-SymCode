export type EntryResult<T extends object = any> = {
  entry: T;
  address: string;
  type: string;
};

export function parseEntry<T extends object>(entry: { Ok: any } | any): T {
  let parseable = entry.Ok ? entry.Ok : entry;
  return JSON.parse(parseable.App[1]);
}

export function parseEntryResult<T extends object>(
  entry: any
): EntryResult<T> | undefined {
  if (!entry.result.Single.meta) return undefined;
  return {
    entry: parseEntry<T>(entry.result.Single.entry),
    address: entry.result.Single.meta.address,
    type: entry.result.Single.meta.entry_type.App
  };
}

export function parseEntries<T extends object>(
  entryArray: Array<any>
): Array<T> {
  return entryArray.map(entry => parseEntry(entry));
}

export function parseEntriesResults<T extends object>(
  entryArray: Array<any>
): Array<EntryResult<T>> {
  return entryArray
    .map(entry => parseEntryResult<T>(entry.Ok ? entry.Ok : entry))
    .filter(entry => entry != undefined) as Array<EntryResult<T>>;
}
