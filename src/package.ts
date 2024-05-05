/* Do not change these import lines to match external modules in webpack configuration */
import * as grok from 'datagrok-api/grok';
import * as ui from 'datagrok-api/ui';
import * as DG from 'datagrok-api/dg';
import {SparklinesTutorial} from "./tutorials/sparklines";

export const _package = new DG.Package();

//name: info
export function info() {
  grok.shell.info(_package.webRoot);
}

//tags: tutorial
//meta.name: Sparklines Tutorial
//meta.track: Test Track
//description: This tutorial teaches users how to add a column with sparklines in the grid
//output: object
export function registerTutorial() {
  return new SparklinesTutorial();
}