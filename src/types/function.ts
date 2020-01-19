import { JsonPath } from '@stoplight/types';
import { DocumentInventory } from '../documentInventory';
import { DefaultFunctions } from '../functions';

export interface IFunctionContext {
  functions: DefaultFunctions;
}

export type IFunction<O = any> = (
  targetValue: any,
  options: O,
  paths: IFunctionPaths,
  otherValues: IFunctionValues,
) => void | IFunctionResult[];

export interface IFunctionPaths {
  given: JsonPath;
  target?: JsonPath;
}

export interface IFunctionValues {
  original: any;
  given: any;
  resolved: DocumentInventory;
}

export interface IFunctionResult {
  message: string;
  path?: JsonPath;
}
