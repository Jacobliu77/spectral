import { RulesetExceptionCollection } from './src/types/ruleset';

import { Dictionary } from '@stoplight/types';
import { IRunRule, isAsyncApiv2, Rule, Spectral } from './src';
import { readRuleset } from './src/rulesets';
import { getDiagnosticSeverity } from './src/rulesets/severity';

export const buildRulesetExceptionCollectionFrom = (
  loc: string,
  rules: string[] = ['a'],
): RulesetExceptionCollection => {
  const source = {};
  source[loc] = rules;
  return source;
};

export const buildTestSpectralWithAsyncApiRule = async (ruleName: string): Promise<[Spectral, IRunRule]> => {
  const ruleset = await readRuleset('spectral:asyncapi');

  expect(Object.keys(ruleset.rules)).toContain(ruleName);

  const s = new Spectral();
  s.registerFormat('asyncapi2', isAsyncApiv2);

  const dic: Dictionary<Rule, string> = {};
  const rule = ruleset.rules[ruleName];
  dic[ruleName] = rule;

  if (rule.severity === void 0) {
    throw new Error('Unexpected undefined severity');
  }

  const expectedSeverity = getDiagnosticSeverity(rule.severity);

  expect(expectedSeverity).not.toEqual(-1);

  s.setRules(dic);

  expect(Object.keys(s.rules)).toContain(ruleName);

  return [s, s.rules[ruleName]];
};
