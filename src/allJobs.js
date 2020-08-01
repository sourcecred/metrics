// @flow

import type {Job} from "./job";

import {default as one} from "./jobs/one";
import {default as two} from "./jobs/two";

export default ([one, two]: $ReadOnlyArray<Job>);
