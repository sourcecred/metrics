// @flow

export type JsonObject =
  | null
  | string
  | number
  | boolean
  | $ReadOnlyArray<JsonObject>
  | {+[key: string]: JsonObject};
