import { trackEvent } from '../../../config/firebase';

// Types
interface UserActivity {
  totalSessions: number;
  cvEvaluations: number;
  careerQuizzes: number;
  visitedPages: {
    cv: number;
    code: number;
    road: number;
    career: number;
  };
}

interface Recommendation {
  title: string;
  description: string;
  priority: number;
  type: 'cv' | 'skill' | 'career' | 'learning';
}

// Rules configuration
const RULES = {
  MIN_SESSIONS_FOR_ADVANCED: 20,
  MIN_CV_EVALUATIONS: 3,
  MIN_CAREER_QUIZZES: 2,
  MIN_PAGE_VISITS: 10,
};

// Recommendation templates
const RECOMMENDATION_TEMPLATES = {
  CV: {
    BASIC: {
      title: 'Complete Your CV Profile',
      description: 'Add more details to your CV to increase your chances of getting noticed by employers.',
      type: 'cv' as const,
    },
    ADVANCED: {
      title: 'Optimize Your CV',
      description: 'Based on your activity, consider adding more technical skills and project details to your CV.',
      type: 'cv' as const,
    },
  },
  SKILL: {
    BASIC: {
      title: 'Start Learning New Skills',
      description: 'Begin with fundamental skills in your chosen career path.',
      type: 'skill' as const,
    },
    ADVANCED: {
      title: 'Enhance Your Skill Set',
      description: 'Focus on advanced topics and practical projects to strengthen your profile.',
      type: 'skill' as const,
    },
  },
  CAREER: {
    BASIC: {
      title: 'Explore Career Paths',
      description: 'Take career quizzes to discover suitable career paths for your skills and interests.',
      type: 'career' as const,
    },
    ADVANCED: {
      title: 'Refine Your Career Goals',
      description: 'Based on your progress, consider specializing in specific areas of your chosen field.',
      type: 'career' as const,
    },
  },
  LEARNING: {
    BASIC: {
      title: 'Start Your Learning Journey',
      description: 'Begin with basic courses and gradually progress to more advanced topics.',
      type: 'learning' as const,
    },
    ADVANCED: {
      title: 'Deepen Your Knowledge',
      description: 'Focus on advanced topics and practical projects to enhance your expertise.',
      type: 'learning' as const,
    },
  },
};

export class RecommendationEngine {
  private userActivity: UserActivity;

  constructor(userActivity: UserActivity) {
    this.userActivity = userActivity;
  }

  private isAdvancedUser(): boolean {
    return (
      this.userActivity.totalSessions >= RULES.MIN_SESSIONS_FOR_ADVANCED && this.userActivity.cvEvaluations >= RULES.MIN_CV_EVALUATIONS && this.userActivity.careerQuizzes >= RULES.MIN_CAREER_QUIZZES
    );
  }

  private getCvRecommendations(): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const level = this.isAdvancedUser() ? 'ADVANCED' : 'BASIC';

    if (this.userActivity.visitedPages.cv < RULES.MIN_PAGE_VISITS) {
      recommendations.push({
        ...RECOMMENDATION_TEMPLATES.CV[level],
        priority: 1,
      });
    }

    return recommendations;
  }

  private getSkillRecommendations(): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const level = this.isAdvancedUser() ? 'ADVANCED' : 'BASIC';

    if (this.userActivity.visitedPages.code < RULES.MIN_PAGE_VISITS) {
      recommendations.push({
        ...RECOMMENDATION_TEMPLATES.SKILL[level],
        priority: 2,
      });
    }

    return recommendations;
  }

  private getCareerRecommendations(): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const level = this.isAdvancedUser() ? 'ADVANCED' : 'BASIC';

    if (this.userActivity.careerQuizzes < RULES.MIN_CAREER_QUIZZES) {
      recommendations.push({
        ...RECOMMENDATION_TEMPLATES.CAREER[level],
        priority: 3,
      });
    }

    return recommendations;
  }

  private getLearningRecommendations(): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const level = this.isAdvancedUser() ? 'ADVANCED' : 'BASIC';

    if (this.userActivity.totalSessions < RULES.MIN_SESSIONS_FOR_ADVANCED) {
      recommendations.push({
        ...RECOMMENDATION_TEMPLATES.LEARNING[level],
        priority: 4,
      });
    }

    return recommendations;
  }

  public getRecommendations(): Recommendation[] {
    // Track recommendation generation
    trackEvent('recommendation_engine_generate', {
      is_advanced_user: this.isAdvancedUser(),
      total_sessions: this.userActivity.totalSessions,
      cv_evaluations: this.userActivity.cvEvaluations,
      career_quizzes: this.userActivity.careerQuizzes,
    });

    // Get recommendations from all categories
    const allRecommendations = [...this.getCvRecommendations(), ...this.getSkillRecommendations(), ...this.getCareerRecommendations(), ...this.getLearningRecommendations()];

    // Sort by priority
    return allRecommendations.sort((a, b) => a.priority - b.priority);
  }
}
