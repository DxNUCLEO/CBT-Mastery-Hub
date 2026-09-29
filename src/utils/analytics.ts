import { TestResult, OverallAnalytics, UserBookmark, SubjectId, UserResponse, Question, TestConfig, ChapterProgress } from '../types';

const STORAGE_KEYS = {
  TEST_RESULTS: 'apexcbt_test_results_v1',
  BOOKMARKS: 'apexcbt_bookmarks_v1',
  ACTIVE_EXAM: 'apexcbt_active_exam_v1',
  CHAPTER_PROGRESS: 'apexcbt_chapter_progress_v1',
};

// ─── Test Result Calculation ────────────────────────────────

export function calculateTestResult(
  config: TestConfig,
  questions: Question[],
  responses: Record<string, UserResponse>,
  timeTakenSeconds: number
): TestResult {
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  const subjectBreakdown: TestResult['subjectBreakdown'] = {
    general_awareness: { total: 0, attempted: 0, correct: 0, wrong: 0, netScore: 0, accuracy: 0 },
    science: { total: 0, attempted: 0, correct: 0, wrong: 0, netScore: 0, accuracy: 0 },
    english: { total: 0, attempted: 0, correct: 0, wrong: 0, netScore: 0, accuracy: 0 },
    mathematics: { total: 0, attempted: 0, correct: 0, wrong: 0, netScore: 0, accuracy: 0 },
  };

  questions.forEach((q) => {
    const resp = responses[q.id];
    const s = subjectBreakdown[q.subject];
    s.total += 1;

    if (!resp || resp.selectedOption === null) {
      unattemptedCount += 1;
    } else {
      s.attempted += 1;
      if (resp.selectedOption === q.correctIndex) {
        correctCount += 1;
        s.correct += 1;
      } else {
        wrongCount += 1;
        s.wrong += 1;
      }
    }
  });

  // Calculate subject net scores and accuracy
  Object.keys(subjectBreakdown).forEach((key) => {
    const sId = key as SubjectId;
    const s = subjectBreakdown[sId];
    s.netScore = Number((s.correct * 2 - s.wrong * 0.5).toFixed(2));
    s.accuracy = s.attempted > 0 ? Number(((s.correct / s.attempted) * 100).toFixed(1)) : 0;
  });

  const positiveMarks = correctCount * 2;
  const negativeMarks = Number((wrongCount * 0.5).toFixed(2));
  const netScore = Number((positiveMarks - negativeMarks).toFixed(2));
  const totalMarks = questions.length * 2;
  const percentage = totalMarks > 0 ? Number(((Math.max(0, netScore) / totalMarks) * 100).toFixed(1)) : 0;

  const result: TestResult = {
    id: `test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    config,
    totalQuestions: questions.length,
    attemptedCount: correctCount + wrongCount,
    correctCount,
    wrongCount,
    unattemptedCount,
    positiveMarks,
    negativeMarks,
    netScore,
    totalMarks,
    percentage,
    timeTakenSeconds,
    subjectBreakdown,
    responses,
    questionList: questions,
  };

  saveTestResult(result);
  return result;
}

// ─── Test Results Storage ───────────────────────────────────

export function saveTestResult(result: TestResult): void {
  try {
    const existing = getTestResults();
    existing.unshift(result);
    // Keep last 50 tests
    const pruned = existing.slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify(pruned));
  } catch (err) {
    console.error('Failed to save test result', err);
  }
}

export function getTestResults(): TestResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function clearAllTestResults(): void {
  localStorage.removeItem(STORAGE_KEYS.TEST_RESULTS);
}

// ─── Overall Analytics Computation ──────────────────────────

export function computeOverallAnalytics(): OverallAnalytics {
  const results = getTestResults();

  if (results.length === 0) {
    return {
      totalTestsCompleted: 0,
      totalQuestionsAttempted: 0,
      totalCorrect: 0,
      totalWrong: 0,
      overallAccuracy: 0,
      averageScorePercentage: 0,
      totalTimeSpentSeconds: 0,
      subjectStats: {
        general_awareness: { questionsAttempted: 0, correct: 0, wrong: 0, accuracy: 0, avgTimePerQuestion: 0 },
        science: { questionsAttempted: 0, correct: 0, wrong: 0, accuracy: 0, avgTimePerQuestion: 0 },
        english: { questionsAttempted: 0, correct: 0, wrong: 0, accuracy: 0, avgTimePerQuestion: 0 },
        mathematics: { questionsAttempted: 0, correct: 0, wrong: 0, accuracy: 0, avgTimePerQuestion: 0 },
      },
      recentScores: [],
      weakTopics: [],
      strongTopics: [],
    };
  }

  let totalQuestionsAttempted = 0;
  let totalCorrect = 0;
  let totalWrong = 0;
  let totalPercentageSum = 0;
  let totalTimeSpentSeconds = 0;

  const subjectStats: OverallAnalytics['subjectStats'] = {
    general_awareness: { questionsAttempted: 0, correct: 0, wrong: 0, accuracy: 0, avgTimePerQuestion: 0 },
    science: { questionsAttempted: 0, correct: 0, wrong: 0, accuracy: 0, avgTimePerQuestion: 0 },
    english: { questionsAttempted: 0, correct: 0, wrong: 0, accuracy: 0, avgTimePerQuestion: 0 },
    mathematics: { questionsAttempted: 0, correct: 0, wrong: 0, accuracy: 0, avgTimePerQuestion: 0 },
  };

  const topicScores: Record<string, { correct: number; total: number }> = {};

  results.forEach((res) => {
    totalQuestionsAttempted += res.attemptedCount;
    totalCorrect += res.correctCount;
    totalWrong += res.wrongCount;
    totalPercentageSum += res.percentage;
    totalTimeSpentSeconds += res.timeTakenSeconds;

    // Subject breakdown tally
    (Object.keys(res.subjectBreakdown) as SubjectId[]).forEach((sId) => {
      const sb = res.subjectBreakdown[sId];
      if (sb) {
        subjectStats[sId].questionsAttempted += sb.attempted;
        subjectStats[sId].correct += sb.correct;
        subjectStats[sId].wrong += sb.wrong;
      }
    });

    // Topic mastery tally
    res.questionList.forEach((q) => {
      const resp = res.responses[q.id];
      if (!resp || resp.selectedOption === null) return;
      if (!topicScores[q.topic]) {
        topicScores[q.topic] = { correct: 0, total: 0 };
      }
      topicScores[q.topic].total += 1;
      if (resp.selectedOption === q.correctIndex) {
        topicScores[q.topic].correct += 1;
      }
    });
  });

  (Object.keys(subjectStats) as SubjectId[]).forEach((sId) => {
    const stat = subjectStats[sId];
    stat.accuracy = stat.questionsAttempted > 0 ? Number(((stat.correct / stat.questionsAttempted) * 100).toFixed(1)) : 0;
    stat.avgTimePerQuestion = stat.questionsAttempted > 0 ? Math.round(totalTimeSpentSeconds / totalQuestionsAttempted) : 45;
  });

  // Determine strong and weak topics
  const strongTopics: string[] = [];
  const weakTopics: string[] = [];

  Object.entries(topicScores).forEach(([topic, data]) => {
    if (data.total >= 3) {
      const acc = (data.correct / data.total) * 100;
      if (acc >= 70) strongTopics.push(topic);
      else if (acc < 50) weakTopics.push(topic);
    }
  });

  // Recent scores for sparkline/trend
  const recentScores = results.slice(0, 10).reverse().map((r) => {
    const dateObj = new Date(r.timestamp);
    const dateStr = `${dateObj.getMonth() + 1}/${dateObj.getDate()} ${dateObj.getHours()}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
    const subjectName = r.config.subjects.length > 1 ? 'All Subjects Mock' : r.config.subjects[0].replace('_', ' ').toUpperCase();
    return {
      testId: r.id,
      date: dateStr,
      score: r.netScore,
      totalMarks: r.totalMarks,
      percentage: r.percentage,
      mode: r.config.mode,
      subjectName,
    };
  });

  return {
    totalTestsCompleted: results.length,
    totalQuestionsAttempted,
    totalCorrect,
    totalWrong,
    overallAccuracy: totalQuestionsAttempted > 0 ? Number(((totalCorrect / totalQuestionsAttempted) * 100).toFixed(1)) : 0,
    averageScorePercentage: Number((totalPercentageSum / results.length).toFixed(1)),
    totalTimeSpentSeconds,
    subjectStats,
    recentScores,
    weakTopics: weakTopics.slice(0, 4),
    strongTopics: strongTopics.slice(0, 4),
  };
}

// ─── Bookmarks Management ───────────────────────────────────

export function getBookmarks(): UserBookmark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isBookmarked(questionId: string): boolean {
  const bookmarks = getBookmarks();
  return bookmarks.some((b) => b.questionId === questionId);
}

export function toggleBookmark(question: Question, userNotes?: string): boolean {
  try {
    const bookmarks = getBookmarks();
    const existingIndex = bookmarks.findIndex((b) => b.questionId === question.id);
    if (existingIndex >= 0) {
      bookmarks.splice(existingIndex, 1);
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      return false; // Removed
    } else {
      bookmarks.unshift({
        questionId: question.id,
        question,
        addedAt: Date.now(),
        userNotes,
      });
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      return true; // Added
    }
  } catch {
    return false;
  }
}

// ─── Chapter Progress Management ────────────────────────────

export function getChapterProgressList(): ChapterProgress[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHAPTER_PROGRESS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getChapterProgress(chapterId: string): ChapterProgress | undefined {
  const list = getChapterProgressList();
  return list.find(cp => cp.chapterId === chapterId);
}

export function getChapterProgressBySubject(subjectId: SubjectId): ChapterProgress[] {
  const list = getChapterProgressList();
  return list.filter(cp => cp.subjectId === subjectId);
}

export function calculateStars(score: number): 0 | 1 | 2 | 3 {
  if (score === 10) return 3;
  if (score >= 7) return 2;
  if (score >= 3) return 1;
  return 0;
}

export function saveChapterProgress(
  chapterId: string,
  subjectId: SubjectId,
  topicName: string,
  quizScore: number,
  notesRead: boolean = true
): ChapterProgress {
  const list = getChapterProgressList();
  const existingIdx = list.findIndex(cp => cp.chapterId === chapterId);
  const stars = calculateStars(quizScore);

  const progress: ChapterProgress = {
    chapterId,
    subjectId,
    topicName,
    quizScore,
    stars,
    completedAt: Date.now(),
    notesRead,
  };

  if (existingIdx >= 0) {
    // Only update if new score is higher
    if (quizScore > list[existingIdx].quizScore) {
      list[existingIdx] = progress;
    }
  } else {
    list.push(progress);
  }

  try {
    localStorage.setItem(STORAGE_KEYS.CHAPTER_PROGRESS, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save chapter progress', err);
  }

  return progress;
}

export function markNotesRead(chapterId: string, subjectId: SubjectId, topicName: string): void {
  const list = getChapterProgressList();
  const existing = list.find(cp => cp.chapterId === chapterId);
  if (existing) {
    existing.notesRead = true;
  } else {
    list.push({
      chapterId,
      subjectId,
      topicName,
      quizScore: 0,
      stars: 0,
      completedAt: 0,
      notesRead: true,
    });
  }
  try {
    localStorage.setItem(STORAGE_KEYS.CHAPTER_PROGRESS, JSON.stringify(list));
  } catch {}
}

export function clearChapterProgress(): void {
  localStorage.removeItem(STORAGE_KEYS.CHAPTER_PROGRESS);
}

// ─── Utility ────────────────────────────────────────────────

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
