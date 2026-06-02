const BIRTH_DATE = new Date(2001, 11, 24);

/** Returns the current age in full years, computed from a fixed birth date. */
export function getAge(): number {
  const today = new Date();
  let age = today.getFullYear() - BIRTH_DATE.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > BIRTH_DATE.getMonth() ||
    (today.getMonth() === BIRTH_DATE.getMonth() && today.getDate() >= BIRTH_DATE.getDate());
  if (!hasBirthdayPassed) age--;
  return age;
}
