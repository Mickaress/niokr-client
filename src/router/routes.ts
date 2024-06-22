import ContactPage from '@/pages/ContactPage.vue';
import CreateProjectPage from '@/pages/CreateProjectPage.vue';
import CreateVacancyPage from '@/pages/CreateVacancyPage.vue';
import FaqPage from '@/pages/FaqPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProjectDetails from '@/pages/ProjectPage/ProjectDetails.vue';
import ProjectPage from '@/pages/ProjectPage/ProjectPage.vue';
import ProjectVacancyList from '@/pages/ProjectPage/ProjectVacancyList.vue';
import ProjectsPage from '@/pages/ProjectsPage.vue';
import UserInfo from '@/pages/UserPage/UserInfo.vue';
import UserPage from '@/pages/UserPage/UserPage.vue';
import SkillOffers from '@/pages/UserPage/admin/SkillOffers.vue';
import VacancyOffers from '@/pages/UserPage/admin/VacancyOffers.vue';
import CandidateResponses from '@/pages/UserPage/candidate/CandidateResponses.vue';
import SupervisorProjectVacancies from '@/pages/UserPage/supervisor/SupervisorProjectVacancies.vue';
import SupervisorProjects from '@/pages/UserPage/supervisor/SupervisorProjects.vue';
import SupervisorVacancyResponses from '@/pages/UserPage/supervisor/SupervisorVacancyResponses.vue';
import VacanciesPage from '@/pages/VacanciesPage.vue';
import VacancyPage from '@/pages/VacancyPage.vue';
import type { RouteRecordRaw } from 'vue-router';
import { RouteNames } from './types/routeNames';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: VacanciesPage,
    name: RouteNames.VACANCIES,
    meta: {
      title: 'Все вакансии',
      type: ['main-nav', 'mobile-nav'],
      order: 0,
      svg: `
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none"         xmlns="http://www.w3.org/2000/svg">
        <path d="M2 3.50012H8C9.06087 3.50012 10.0783 3.92155 10.8284 4.67169C11.5786 5.42184 12 6.43926 12 7.50012V21.5001C12 20.7045 11.6839 19.9414 11.1213 19.3788C10.5587 18.8162 9.79565 18.5001 9 18.5001H2V3.50012Z" stroke="#3D68ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22 3.50012H16C14.9391 3.50012 13.9217 3.92155 13.1716 4.67169C12.4214 5.42184 12 6.43926 12 7.50012V21.5001C12 20.7045 12.3161 19.9414 12.8787 19.3788C13.4413 18.8162 14.2044 18.5001 15 18.5001H22V3.50012Z" stroke="#3D68ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
  },
  {
    path: '/vacancy/:id',
    component: VacancyPage,
    name: RouteNames.VACANCY_DETAILS,
    meta: {
      title: 'О вакансии',
    },
  },
  {
    path: '/vacancy/create/:id',
    component: CreateVacancyPage,
    name: RouteNames.SUPERVISOR_VACANCY_CREATE,
    meta: {
      title: 'Создать вакансию',
      requiresAuth: true,
      role: ['specialist'],
    },
  },
  {
    path: '/project/create',
    name: RouteNames.ADMIN_PROJECT_CREATE,
    component: CreateProjectPage,
    meta: {
      title: 'Создать НИОКР',
      requiresAuth: true,
      role: ['admin'],
    },
  },
  {
    path: '/projects',
    component: ProjectsPage,
    name: RouteNames.PROJECTS,
    meta: {
      title: 'Все НИОКР',
      type: ['main-nav', 'mobile-nav'],
      order: 1,
      svg: `
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none"         xmlns="http://www.w3.org/2000/svg">
        <path d="M2 3.50012H8C9.06087 3.50012 10.0783 3.92155 10.8284 4.67169C11.5786 5.42184 12 6.43926 12 7.50012V21.5001C12 20.7045 11.6839 19.9414 11.1213 19.3788C10.5587 18.8162 9.79565 18.5001 9 18.5001H2V3.50012Z" stroke="#3D68ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22 3.50012H16C14.9391 3.50012 13.9217 3.92155 13.1716 4.67169C12.4214 5.42184 12 6.43926 12 7.50012V21.5001C12 20.7045 12.3161 19.9414 12.8787 19.3788C13.4413 18.8162 14.2044 18.5001 15 18.5001H22V3.50012Z" stroke="#3D68ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
  },
  {
    path: '/project/:id',
    component: ProjectPage,
    name: RouteNames.PROJECT,
    children: [
      {
        path: '',
        name: RouteNames.PROJECT_DETAILS,
        component: ProjectDetails,
        meta: {
          title: 'О НИОКР',
        },
      },
      {
        path: 'vacancies',
        name: RouteNames.PROJECT_VACANCIES,
        component: ProjectVacancyList,
        meta: {
          title: 'Список вакансий',
        },
      },
    ],
  },
  {
    path: '/profile',
    component: UserPage,
    name: RouteNames.USER_PAGE,
    meta: {
      title: 'Профиль пользователя',
      requiresAuth: true,
    },
    children: [
      {
        path: 'info',
        name: RouteNames.USER_INFO,
        component: UserInfo,
        meta: {
          title: 'Мой профиль',
          type: ['user-nav', 'mobile-nav'],
          order: 0,
        },
      },
      {
        path: 'responses',
        name: RouteNames.RESPONSES,
        component: CandidateResponses,
        meta: {
          title: 'Мои отклики',
          type: ['user-nav'],
          order: 1,
          role: ['specialist'],
        },
      },
      {
        path: 'project-vacancies/:projectId?',
        name: RouteNames.SUPERVISOR_PROJECT_VACANCIES,
        component: SupervisorProjectVacancies,
        meta: {
          title: 'Вакансии',
          type: ['user-nav'],
          order: 3,
          role: ['specialist'],
          links: [],
        },
      },
      {
        path: 'vacancy-responses/:filterBy?',
        name: RouteNames.SUPERVISOR_VACANCY_RESPONSES,
        component: SupervisorVacancyResponses,
        meta: {
          title: 'Отклики',
          role: ['specialist'],
        },
      },
      {
        path: 'projects',
        name: RouteNames.SUPERVISOR_PROJECTS,
        component: SupervisorProjects,
        meta: {
          title: 'Мои НИОКР',
          type: ['user-nav'],
          order: 2,
          role: ['specialist'],
        },
      },
      {
        path: 'vacancy-offers',
        name: RouteNames.ADMIN_VACANCY_OFFER,
        component: VacancyOffers,
        meta: {
          title: 'Заявки на вакансии',
          type: ['user-nav'],
          order: 1,
          role: ['admin'],
        },
      },
      {
        path: 'skill-offers',
        name: RouteNames.ADMIN_SKILL_OFFER,
        component: SkillOffers,
        meta: {
          title: 'Заявки на навыки',
          type: ['user-nav'],
          order: 2,
          role: ['admin'],
        },
      },
    ],
  },
  {
    path: '/faq',
    component: FaqPage,
    name: RouteNames.FAQ,
    meta: {
      title: 'Вопрос-ответ',
      type: ['main-nav', 'mobile-nav'],
      order: 2,
      svg: `
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.3335 15.5001C21.3335 16.0306 21.1228 16.5393 20.7477 16.9143C20.3726 17.2894 19.8639 17.5001 19.3335 17.5001H7.3335L3.3335 21.5001V5.50012C3.3335 4.96969 3.54421 4.46098 3.91928 4.08591C4.29436 3.71084 4.80306 3.50012 5.3335 3.50012H19.3335C19.8639 3.50012 20.3726 3.71084 20.7477 4.08591C21.1228 4.46098 21.3335 4.96969 21.3335 5.50012V15.5001Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
  },
  {
    path: '/contacts',
    component: ContactPage,
    name: RouteNames.CONTACTS,
    meta: {
      title: 'Контакты',
      type: ['main-nav', 'mobile-nav'],
      order: 3,
      svg: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1235_4978)">
        <path d="M21 10.0001C21 17.0001 12 23.0001 12 23.0001C12 23.0001 3 17.0001 3 10.0001C3 7.61317 3.94821 5.32399 5.63604 3.63616C7.32387 1.94833 9.61305 1.00012 12 1.00012C14.3869 1.00012 16.6761 1.94833 18.364 3.63616C20.0518 5.32399 21 7.61317 21 10.0001Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 13.0001C13.6569 13.0001 15 11.657 15 10.0001C15 8.34327 13.6569 7.00012 12 7.00012C10.3431 7.00012 9 8.34327 9 10.0001C9 11.657 10.3431 13.0001 12 13.0001Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_1235_4978">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
      </svg>
      `,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
    name: RouteNames.NOT_FOUND,
  },
];
