import { mockDashboardData, DashboardData } from './dashboardMock';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const mockDashboardService = {
  getDashboardData: async (): Promise<ApiResponse<DashboardData>> => {
    await delay(1000); // Simulate network delay
    return {
      success: true,
      data: mockDashboardData,
      message: 'Dashboard data fetched successfully',
    };
  },

  getUserProfile: async () => {
    await delay(500);
    return {
      success: true,
      data: mockDashboardData.user,
      message: 'User profile fetched successfully',
    };
  },

  getStats: async () => {
    await delay(800);
    return {
      success: true,
      data: mockDashboardData.stats,
      message: 'Stats fetched successfully',
    };
  },

  getActivities: async () => {
    await delay(600);
    return {
      success: true,
      data: mockDashboardData.activities,
      message: 'Activities fetched successfully',
    };
  },

  getPlans: async () => {
    await delay(700);
    return {
      success: true,
      data: mockDashboardData.plans,
      message: 'Plans fetched successfully',
    };
  },

  // Mock error scenarios for testing
  simulateError: async () => {
    await delay(500);
    throw new Error('Simulated API error');
  },
};
