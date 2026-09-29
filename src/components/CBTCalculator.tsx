import React, { useState } from 'react';
import { X, Delete, RotateCcw } from 'lucide-react';

interface CBTCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CBTCalculator: React.FC<CBTCalculatorProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [memory, setMemory] = useState<number>(0);
  const [isScientific, setIsScientific] = useState(false);

  if (!isOpen) return null;

  const handleNum = (num: string) => {
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? num : prev + num));
  };

  const handleOp = (op: string) => {
    setFormula(`${display} ${op} `);
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setFormula('');
  };

  const handleBackspace = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const handleEqual = () => {
    try {
      if (!formula) return;
      const fullExpr = formula + display;
      // Sanitize input to only valid math
      const sanitized = fullExpr.replace(/×/g, '*').replace(/÷/g, '/');
      // eslint-disable-next-line no-eval
      const result = Function(`'use strict'; return (${sanitized})`)();
      setDisplay(String(Number(result.toFixed(6))));
      setFormula('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleSqrt = () => {
    try {
      const val = parseFloat(display);
      if (val < 0) {
        setDisplay('Error');
        return;
      }
      setDisplay(String(Number(Math.sqrt(val).toFixed(6))));
    } catch {
      setDisplay('Error');
    }
  };

  const handleSquare = () => {
    try {
      const val = parseFloat(display);
      setDisplay(String(Number((val * val).toFixed(6))));
    } catch {
      setDisplay('Error');
    }
  };

  const handleTrig = (func: 'sin' | 'cos' | 'tan') => {
    try {
      const deg = parseFloat(display);
      const rad = (deg * Math.PI) / 180;
      let res = 0;
      if (func === 'sin') res = Math.sin(rad);
      if (func === 'cos') res = Math.cos(rad);
      if (func === 'tan') res = Math.tan(rad);
      setDisplay(String(Number(res.toFixed(6))));
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              CBT Virtual Calculator
            </span>
            <button
              onClick={() => setIsScientific(!isScientific)}
              className="px-2 py-0.5 text-[11px] font-medium rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 transition-colors cursor-pointer"
            >
              {isScientific ? 'Standard' : 'Scientific'}
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Display */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">
          <div className="text-right text-xs text-slate-500 dark:text-slate-400 font-mono h-4 truncate">
            {formula}
          </div>
          <div className="text-right text-2xl font-mono font-bold text-slate-900 dark:text-white truncate">
            {display}
          </div>
        </div>

        {/* Scientific row if enabled */}
        {isScientific && (
          <div className="grid grid-cols-4 gap-1 p-2 bg-slate-100/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => handleTrig('sin')}
              className="py-1.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-medium"
            >
              sin
            </button>
            <button
              onClick={() => handleTrig('cos')}
              className="py-1.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-medium"
            >
              cos
            </button>
            <button
              onClick={() => handleTrig('tan')}
              className="py-1.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-medium"
            >
              tan
            </button>
            <button
              onClick={() => {
                setDisplay(String(Math.PI.toFixed(6)));
              }}
              className="py-1.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-medium font-mono"
            >
              π
            </button>
          </div>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-1.5 p-3">
          <button
            onClick={handleClear}
            className="py-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 font-semibold text-xs cursor-pointer flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> C
          </button>
          <button
            onClick={handleBackspace}
            className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-medium text-xs cursor-pointer flex items-center justify-center"
          >
            <Delete className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleSqrt}
            className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-medium text-xs cursor-pointer"
          >
            √x
          </button>
          <button
            onClick={() => handleOp('÷')}
            className="py-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 font-bold text-sm cursor-pointer"
          >
            ÷
          </button>

          {['7', '8', '9'].map((n) => (
            <button
              key={n}
              onClick={() => handleNum(n)}
              className="py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-800 dark:text-white font-semibold text-sm cursor-pointer"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleOp('×')}
            className="py-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 font-bold text-sm cursor-pointer"
          >
            ×
          </button>

          {['4', '5', '6'].map((n) => (
            <button
              key={n}
              onClick={() => handleNum(n)}
              className="py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-800 dark:text-white font-semibold text-sm cursor-pointer"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleOp('-')}
            className="py-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 font-bold text-sm cursor-pointer"
          >
            -
          </button>

          {['1', '2', '3'].map((n) => (
            <button
              key={n}
              onClick={() => handleNum(n)}
              className="py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-800 dark:text-white font-semibold text-sm cursor-pointer"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleOp('+')}
            className="py-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 font-bold text-sm cursor-pointer"
          >
            +
          </button>

          <button
            onClick={handleSquare}
            className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-medium text-xs cursor-pointer"
          >
            x²
          </button>
          <button
            onClick={() => handleNum('0')}
            className="py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-800 dark:text-white font-semibold text-sm cursor-pointer"
          >
            0
          </button>
          <button
            onClick={() => {
              if (!display.includes('.')) setDisplay((prev) => prev + '.');
            }}
            className="py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-800 dark:text-white font-semibold text-sm cursor-pointer"
          >
            .
          </button>
          <button
            onClick={handleEqual}
            className="py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm cursor-pointer"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};
