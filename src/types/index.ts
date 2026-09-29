export type SubjectId = 'general_awareness' | 'science' | 'english' | 'mathematics';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type ExamMode = 'test' | 'study';

export interface Question {
  id: string;
  subject: SubjectId;
  topic: string;
  subtopic?: string;
  difficulty: Difficulty;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, 3
  explanation: string;
  hint: string;
  formulaOrRule?: string;
}

export interface UserResponse {
  questionId: string;
  selectedOption: number | null; // null if unattempted, 0..3
  isMarkedForReview: boolean;
  timeSpentSeconds: number;
  visited: boolean;
}

export interface TestConfig {
  mode: ExamMode;
  subjects: SubjectId[]; // single or multiple
  difficulty: Difficulty | 'mixed';
  fullMarks: number; // 50, 100, 200, etc.
  questionsCount: number; // calculated: fullMarks / 2 (since each right is 2 marks)
  durationMinutes: number; // standard: questionsCount * 1.2 or selected
}

export interface TestResult {
  id: string;
  timestamp: number;
  config: TestConfig;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  wrongCount: number;
  unattemptedCount: number;
  positiveMarks: number; // correctCount * 2
  negativeMarks: number; // wrongCount * 0.5
  netScore: number; // positiveMarks - negativeMarks
  totalMarks: number; // totalQuestions * 2
  percentage: number;
  timeTakenSeconds: number;
  subjectBreakdown: Record<SubjectId, {
    total: number;
    attempted: number;
    correct: number;
    wrong: number;
    netScore: number;
    accuracy: number;
  }>;
  responses: Record<string, UserResponse>;
  questionList: Question[];
}

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  shortName: string;
  description: string;
  topics: string[];
  color: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  iconName: string;
  imageUrl: string;
}

export interface UserBookmark {
  questionId: string;
  question: Question;
  addedAt: number;
  userNotes?: string;
}

export interface OverallAnalytics {
  totalTestsCompleted: number;
  totalQuestionsAttempted: number;
  totalCorrect: number;
  totalWrong: number;
  overallAccuracy: number;
  averageScorePercentage: number;
  totalTimeSpentSeconds: number;
  subjectStats: Record<SubjectId, {
    questionsAttempted: number;
    correct: number;
    wrong: number;
    accuracy: number;
    avgTimePerQuestion: number;
  }>;
  recentScores: {
    testId: string;
    date: string;
    score: number;
    totalMarks: number;
    percentage: number;
    mode: ExamMode;
    subjectName: string;
  }[];
  weakTopics: string[];
  strongTopics: string[];
}

// ─── Study Notes & Chapter Quiz Types ───────────────────────

export interface NoteSection {
  heading: string;
  content: string;
  highlight?: string;
}

export interface ChapterContent {
  id: string;
  title: string;
  subjectId: SubjectId;
  introduction: string;
  sections: NoteSection[];
  keyPoints: string[];
}

export interface ChapterProgress {
  chapterId: string;
  subjectId: SubjectId;
  topicName: string;
  quizScore: number;    // 0–10
  stars: 0 | 1 | 2 | 3;
  completedAt: number;
  notesRead: boolean;
}
