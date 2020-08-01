// @flow

import fetch from "isomorphic-fetch";

import {GITHUB_GRAPHQL_URL, SOURCECRED_GITHUB_TOKEN, getenv} from "../env";
import type {Message} from "../frame";
import type {Job, JobResult} from "../job";
import type {JsonObject} from "../json";

const version = "v1";

const config = {
  owner: "sourcecred",
  name: "sourcecred",
};

const graphqlQuery = `\
query StargazersCount($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    stargazers(first: 0) {
      totalCount
    }
  }
}
`;

function fatal(error: JsonObject): Message<null> {
  return {
    value: null,
    errors: [error],
  };
}

const job: Job = {
  name() {
    return "stargazers";
  },
  async run(): Promise<JobResult> {
    const token = getenv(SOURCECRED_GITHUB_TOKEN);
    const graphqlUrl = getenv(GITHUB_GRAPHQL_URL);
    const postBody = JSON.stringify({
      query: graphqlQuery,
      variables: {owner: config.owner, name: config.name},
    });
    const fetchOptions = {
      method: "POST",
      body: postBody,
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    let json: JsonObject;
    try {
      const response = await fetch(graphqlUrl, fetchOptions);
      json = await response.json();
    } catch (e) {
      return {
        version,
        message: fatal({type: "FETCH_ERROR", payload: String(e)}),
      };
    }
    if (json.errors && json.errors.length > 0) {
      return {
        version,
        message: fatal({type: "GRAPHQL_QUERY_ERROR", errors: json.errors}),
      };
    }
    let stargazers: number;
    try {
      stargazers = json.data.repository.stargazers.totalCount;
    } catch (e) {
      return {
        version,
        message: fatal({type: "BAD_RESPONSE", reason: String(e)}),
      };
    }
    return {version, message: {value: stargazers, errors: []}};
  },
};

export default job;
