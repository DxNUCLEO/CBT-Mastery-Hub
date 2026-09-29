import React, { useState } from 'react';
import { GraduationCap, BookOpen, BarChart3, Bookmark, Play, Moon, Sun, Database, Menu, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentView: 'dashboard' | 'study' | 'analytics' | 'questions' | 'bookmarks';
  onNavigate: (view: 'dashboard' | 'study' | 'analytics' | 'questions' | 'bookmarks') => void;
  onOpenTestConfig: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenTestConfig,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'questions', label: 'Question Bank', icon: Database },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
  ] as const;

  return (
    <header className="sticky top-0 z-30 glass border-b border-stone-200/60 dark:border-stone-800/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100">
              CBT Mastery
            </span>
          </div>
        </motion.button>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item, idx) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === item.id
                  ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* Right: Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5"
        >
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle theme"
            className="p-2 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenTestConfig}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg shadow-sm shadow-teal-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer btn-press"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Exam</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-stone-200/60 dark:border-stone-800/60 bg-white/95 dark:bg-[#0B0F1A]/95"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                    currentView === item.id
                      ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onOpenTestConfig();
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Exam</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
