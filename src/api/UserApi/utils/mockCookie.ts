import Cookies from 'js-cookie';

export const setUserToCookies = (token?: number) => {
  Cookies.remove('token');
  if (!token) return;
  Cookies.set('token', String(token));
};

export function askForUserRole(): number | undefined {
  const isStudentCandidate = window.confirm('Зайти как студент-соискатель?');
  if (isStudentCandidate) return 1;

  const isEmployeeCandidate = window.confirm('Зайти как сотрудник-соискатель?');
  if (isEmployeeCandidate) return 2;

  const isSupervisor = window.confirm('Зайти как руководитель?');
  if (isSupervisor) return 3;

  const isAdmin = window.confirm('Зайти как администратор?');
  if (isAdmin) return 5;

  return undefined;
}
