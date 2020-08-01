// @flow
// Environment variable keys.

// GitHub authentication token, as a 40-character hex string.
export const SOURCECRED_GITHUB_TOKEN = "SOURCECRED_GITHUB_TOKEN";

// GitHub GraphQL API endpoint. This is automatically set on GitHub
// Actions jobs:
// <https://docs.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables>
// A sensible default value is: `https://api.github.com/graphql`.
export const GITHUB_GRAPHQL_URL = "GITHUB_GRAPHQL_URL";

export function getenv(key: string): string {
  const result = process.env[key];
  if (result === undefined) {
    throw new Error(`missing environment variable: ${key}`);
  }
  return result;
}
