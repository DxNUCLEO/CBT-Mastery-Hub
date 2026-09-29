import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Star,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  GraduationCap,
  Trophy,
  RotateCcw
} from 'lucide-react';
import { getChaptersBySubject, getChapterById } from '../data/studyContent';
import { getQuestionsBySubject } from '../data/questionBank';
import { getChapterProgressBySubject, saveChapterProgress, calculateStars, markNotesRead, getChapterProgress } from '../utils/analytics';
import { SUBJECTS } from '../data/subjects';
import { SubjectId, Question, ChapterContent, ChapterProgress } from '../types';

interface StudyModeProps {
  initialSubject?: SubjectId;
  onExit: () => void;
}

type StudyView = 'chapters' | 'notes' | 'quiz' | 'results';

export function StudyMode({ initialSubject = 'general_awareness', onExit }: StudyModeProps) {
  const [studyView, setStudyView] = useState<StudyView>('notes');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>(initialSubject);
  const [activeChapterId, setActiveChapterId] = useState<string>('');
  
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [chapters, setChapters] = useState<ChapterContent[]>([]);
  const [chapterProgress, setChapterProgress] = useState<Record<string, ChapterProgress>>({});

  useEffect(() => {
    const subjChapters = getChaptersBySubject(selectedSubject);
    setChapters(subjChapters);
    setChapterProgress(getChapterProgressBySubject(selectedSubject).reduce((acc, curr) => { acc[curr.chapterId] = curr; return acc; }, {} as Record<string, ChapterProgress>));
    
    if (subjChapters.length > 0) {
      if (!subjChapters.some(c => c.id === activeChapterId)) {
        setActiveChapterId(subjChapters[0].id);
        setStudyView('notes');
      }
    } else {
      setActiveChapterId('');
      setStudyView('chapters');
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (activeChapterId) {
      setChapterProgress(getChapterProgressBySubject(selectedSubject).reduce((acc, curr) => { acc[curr.chapterId] = curr; return acc; }, {} as Record<string, ChapterProgress>));
    }
  }, [activeChapterId, studyView, selectedSubject]);

  const activeChapter = chapters.find(c => c.id === activeChapterId);

  const startQuiz = () => {
    if (!activeChapter) return;
    
    markNotesRead(activeChapter.id, selectedSubject, activeChapter.title);
    setChapterProgress(getChapterProgressBySubject(selectedSubject).reduce((acc, curr) => { acc[curr.chapterId] = curr; return acc; }, {} as Record<string, ChapterProgress>));
    
    const subjQuestions = getQuestionsBySubject(selectedSubject);
    const topicQuestions = subjQuestions.filter(q => q.topic === activeChapter.title);
    
    const selected = [...topicQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
    
    setQuizQuestions(selected);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizAnswered(false);
    setSelectedOption(null);
    setStudyView('quiz');
  };

  const handleAnswer = (optionIndex: number) => {
    if (quizAnswered) return;
    
    setSelectedOption(optionIndex);
    setQuizAnswered(true);
    
    const currentQ = quizQuestions[quizIndex];
    if (optionIndex === currentQ.correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
      setQuizAnswered(false);
      setSelectedOption(null);
    } else {
      const stars = calculateStars(quizScore);
      saveChapterProgress(activeChapterId!, selectedSubject, activeChapter!.title, quizScore);
      setChapterProgress(getChapterProgressBySubject(selectedSubject).reduce((acc, curr) => { acc[curr.chapterId] = curr; return acc; }, {} as Record<string, ChapterProgress>));
      setStudyView('results');
    }
  };

  const renderSidebar = () => (
    <div className="w-72 bg-white dark:bg-[#141824] border-r border-stone-200 dark:border-stone-800 flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-stone-200 dark:border-stone-800">
        <button 
          onClick={onExit}
          className="flex items-center text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors mb-4 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </button>
        <h2 className="text-xl font-display font-bold text-stone-900 dark:text-stone-100 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-teal-600 dark:text-teal-500" /> Study Notes
        </h2>
      </div>
      
      <div className="p-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#1C2033] flex flex-wrap gap-2">
        {Object.entries(SUBJECTS).map(([id, subject]) => (
          <button
            key={id}
            onClick={() => {
              setSelectedSubject(id as SubjectId);
              setStudyView('notes');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              selectedSubject === id 
                ? 'bg-teal-600 text-white shadow-sm' 
                : 'bg-white dark:bg-[#0B0F1A] text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:border-teal-500/50'
            }`}
          >
            {subject.name}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <h3 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2 px-2 mt-2">
          Chapters
        </h3>
        <div className="space-y-1">
          {chapters.map((chapter) => {
            const prog = chapterProgress[chapter.id];
            const stars = prog?.stars || 0;
            const isActive = chapter.id === activeChapterId;
            
            return (
              <button
                key={chapter.id}
                onClick={() => {
                  setActiveChapterId(chapter.id);
                  setStudyView('notes');
                }}
                className={`w-full text-left px-3 py-3 rounded-lg flex items-start transition-colors ${
                  isActive 
                    ? 'bg-teal-50 dark:bg-teal-950/30 border-l-4 border-teal-500' 
                    : 'hover:bg-stone-50 dark:hover:bg-stone-800/50 border-l-4 border-transparent'
                }`}
              >
                <div className="flex-1">
                  <div className={`text-sm font-medium ${isActive ? 'text-teal-700 dark:text-teal-400' : 'text-stone-700 dark:text-stone-300'}`}>
                    {chapter.title}
                  </div>
                  <div className="flex items-center mt-1.5 space-x-0.5">
                    {[1, 2, 3].map(star => (
                      <Star 
                        key={star} 
                        className={`w-3.5 h-3.5 ${
                          star <= stars 
                            ? 'text-amber-500 fill-amber-500' 
                            : 'text-stone-300 dark:text-stone-600'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
              </button>
            )
          })}
          {chapters.length === 0 && (
            <div className="px-3 py-4 text-sm text-stone-500 dark:text-stone-400 italic">
              No chapters available for this subject.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderNotes = () => {
    if (!activeChapter) return null;

    return (
      <div className="flex-1 h-full overflow-y-auto bg-[#F7F7F5] dark:bg-[#0B0F1A] p-6 lg:p-10 relative">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 text-sm text-teal-600 dark:text-teal-500 font-medium mb-3">
              <span>{SUBJECTS[selectedSubject].name}</span>
              <ChevronRight className="w-4 h-4" />
              <span>Chapter Notes</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-stone-900 dark:text-stone-100 mb-6">
              {activeChapter.title}
            </h1>
            
            {activeChapter.introduction && (
              <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
                {activeChapter.introduction}
              </p>
            )}
          </motion.div>

          <div className="space-y-12 mb-12">
            {activeChapter.sections.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h2 className="text-2xl font-display font-bold text-stone-900 dark:text-stone-100 mb-4 pl-4 border-l-4 border-teal-500">
                  {section.heading}
                </h2>
                <div className="note-content text-stone-700 dark:text-stone-300 prose dark:prose-invert max-w-none">
                  {section.content.split('\n').map((para, i) => (
                    <p key={i} className="mb-4">{para}</p>
                  ))}
                </div>
                
                {section.highlight && (
                  <div className="mt-6 p-5 bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 rounded-xl">
                    <div className="flex items-start">
                      <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-3 shrink-0 mt-0.5" />
                      <p className="text-teal-900 dark:text-teal-100 font-medium italic">
                        {section.highlight}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {activeChapter.keyPoints && activeChapter.keyPoints.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#141824] rounded-2xl p-6 lg:p-8 shadow-sm border border-stone-200 dark:border-stone-800 mb-12"
            >
              <h3 className="text-xl font-display font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                <GraduationCap className="w-6 h-6 mr-2 text-teal-600 dark:text-teal-500" />
                Key Takeaways
              </h3>
              <ul className="space-y-3">
                {activeChapter.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 mr-3 shrink-0"></div>
                    <span className="text-stone-700 dark:text-stone-300">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <div className="flex justify-center pb-20">
            <button
              onClick={startQuiz}
              className="btn-press w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium text-lg flex items-center justify-center shadow-lg shadow-teal-600/20"
            >
              Start Chapter Quiz
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    if (!quizQuestions.length) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full bg-[#F7F7F5] dark:bg-[#0B0F1A]">
          <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-stone-400" />
          </div>
          <h2 className="text-xl font-display font-bold text-stone-900 dark:text-stone-100 mb-2">No Questions Available</h2>
          <p className="text-stone-500 dark:text-stone-400 mb-6">There are no quiz questions for this topic yet.</p>
          <button 
            onClick={() => setStudyView('notes')}
            className="px-6 py-2 bg-white dark:bg-[#141824] text-stone-700 dark:text-stone-300 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            Back to Notes
          </button>
        </div>
      );
    }

    const currentQ = quizQuestions[quizIndex];

    return (
      <div className="flex-1 h-full overflow-y-auto bg-[#F7F7F5] dark:bg-[#0B0F1A] flex flex-col">
        <div className="bg-white dark:bg-[#141824] border-b border-stone-200 dark:border-stone-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setStudyView('notes')}
              className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Chapter Quiz — {activeChapter?.title}
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Question {quizIndex + 1} of {quizQuestions.length}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium text-stone-500 dark:text-stone-400">
              Score: <span className="text-teal-600 dark:text-teal-400 font-bold">{quizScore}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 lg:p-10 max-w-3xl mx-auto w-full">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-[#141824] rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden"
          >
            <div className="p-6 lg:p-8 border-b border-stone-100 dark:border-stone-800/50">
              <h3 className="text-xl font-medium text-stone-900 dark:text-stone-100 leading-relaxed">
                {currentQ.question}
              </h3>
            </div>
            
            <div className="p-6 lg:p-8 space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                
                let optionStyle = "border-stone-200 dark:border-stone-700 bg-white dark:bg-[#141824] text-stone-700 dark:text-stone-300 hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20";
                
                if (quizAnswered) {
                  if (isCorrect) {
                    optionStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200";
                  } else if (isSelected) {
                    optionStyle = "border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-200";
                  } else {
                    optionStyle = "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30 text-stone-400 dark:text-stone-500 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={quizAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start ${optionStyle}`}
                  >
                    <div className="flex-1">
                      <span className="inline-block w-6 font-mono font-bold opacity-50 mr-2">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {option}
                    </div>
                    {quizAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-2" />}
                    {quizAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
            
            {quizAnswered && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="px-6 lg:px-8 pb-6 lg:pb-8"
              >
                <div className="p-5 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-800/50">
                  <h4 className="text-sm font-bold text-teal-800 dark:text-teal-300 mb-2 uppercase tracking-wide">Explanation</h4>
                  <p className="text-teal-900 dark:text-teal-100/80 text-sm leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={nextQuestion}
                    className="btn-press px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium flex items-center"
                  >
                    {quizIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const totalQs = quizQuestions.length;
    const stars = calculateStars(quizScore);
    
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 h-full bg-[#F7F7F5] dark:bg-[#0B0F1A]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-[#141824] rounded-3xl p-10 max-w-lg w-full text-center shadow-xl shadow-teal-900/5 border border-stone-100 dark:border-stone-800"
        >
          <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10" />
          </div>
          
          <h2 className="text-3xl font-display font-bold text-stone-900 dark:text-stone-100 mb-2">
            Quiz Completed!
          </h2>
          <p className="text-lg text-stone-500 dark:text-stone-400 mb-8">
            You scored <span className="font-bold text-teal-600 dark:text-teal-400">{quizScore}</span> out of {totalQs}
          </p>

          <div className="flex justify-center space-x-4 mb-10">
            {[1, 2, 3].map((star, idx) => (
              <motion.div
                key={star}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.15, type: 'spring', bounce: 0.5 }}
                className="animate-star-pop"
              >
                <Star 
                  className={`w-14 h-14 ${
                    star <= stars 
                      ? 'text-amber-500 fill-amber-500 drop-shadow-md' 
                      : 'text-stone-200 dark:text-stone-700'
                  }`} 
                />
              </motion.div>
            ))}
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => {
                const currentIndex = chapters.findIndex(c => c.id === activeChapterId);
                if (currentIndex < chapters.length - 1) {
                  setActiveChapterId(chapters[currentIndex + 1].id);
                  setStudyView('notes');
                } else {
                  setStudyView('chapters');
                }
              }}
              className="btn-press w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium text-lg flex items-center justify-center"
            >
              Next Chapter <ChevronRight className="w-5 h-5 ml-1" />
            </button>
            <button
              onClick={() => setStudyView('notes')}
              className="w-full py-3 bg-white dark:bg-[#141824] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-xl font-medium transition-colors flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Review Notes
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="h-full flex w-full overflow-hidden">
      {renderSidebar()}
      {studyView === 'notes' && renderNotes()}
      {studyView === 'quiz' && renderQuiz()}
      {studyView === 'results' && renderResults()}
      {studyView === 'chapters' && (
        <div className="flex-1 bg-[#F7F7F5] dark:bg-[#0B0F1A] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <BookOpen className="w-16 h-16 text-teal-600/30 mx-auto mb-6" />
            <h2 className="text-2xl font-display font-bold text-stone-900 dark:text-stone-100 mb-3">Select a Chapter</h2>
            <p className="text-stone-500 dark:text-stone-400">
              Choose a chapter from the sidebar to start reading notes and taking chapter quizzes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


