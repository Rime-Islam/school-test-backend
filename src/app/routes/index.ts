import express from 'express';
import { UserRoutes } from '../modules/user/user.route.js';
import { AuthRoutes } from '../modules/auth/auth.route.js';
import { QuestionRoutes } from '../modules/question/question.route.js';
import { AssessmentRoutes } from '../modules/assessment/assessment.route.js';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/question',
    route: QuestionRoutes,
  },
  {
    path: '/assessment',
    route: AssessmentRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;