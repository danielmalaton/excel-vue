export function extractExpression (expression: string) {
  const [target, statement] = expression.split('=');

  return {
    target: target.trim(),
    sources: statement.trim().split(' + '),
  };
}
