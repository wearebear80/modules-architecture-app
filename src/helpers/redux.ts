export function SUCCESS(actionType: string) {
  return `${actionType}_SUCCESS`
}

export function FAIL(actionType: string) {
  return `${actionType}_FAIL`
}