export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface Stats {
  cvReviews: number;
  codeReviews: number;
  totalProjects: number;
}

export interface Activity {
  id: number;
  type: 'cv_review' | 'code_review' | 'project';
  title: string;
  description: string;
  date: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface DashboardData {
  user: User;
  stats: Stats;
  activities: Activity[];
  plans: Plan[];
}

export const mockDashboardData: DashboardData = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'user',
  },
  stats: {
    cvReviews: 5,
    codeReviews: 3,
    totalProjects: 8,
  },
  activities: [
    {
      id: 1,
      type: 'cv_review',
      title: 'CV Review Completed',
      description: 'Your CV has been reviewed',
      date: '2024-03-15T10:00:00Z',
    },
    {
      id: 2,
      type: 'code_review',
      title: 'Code Review Request',
      description: 'New code review request submitted',
      date: '2024-03-14T15:30:00Z',
    },
    {
      id: 3,
      type: 'project',
      title: 'Project Created',
      description: 'Started new project: Career Platform',
      date: '2024-03-13T09:00:00Z',
    },
  ],
  plans: [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 0,
      features: ['Limited CV reviews', 'Basic analytics', 'Email support'],
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: 29.99,
      features: ['Unlimited CV reviews', 'Advanced analytics', 'Priority support'],
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: 99.99,
      features: ['Custom solutions', 'Dedicated support', 'Team management'],
    },
  ],
};
