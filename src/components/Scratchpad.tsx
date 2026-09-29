import React, { useRef, useState, useEffect } from 'react';
import { X, Eraser, PenTool, Trash2 } from 'lucide-react';

interface ScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Scratchpad: React.FC<ScratchpadProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [roughText, setRoughText] = useState('');
  const [activeTab, setActiveTab] = useState<'draw' | 'notes'>('draw');

  useEffect(() => {
    if (isOpen && activeTab === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = tool === 'pen' ? 2 : 16;
      }
    }
  }, [isOpen, activeTab, tool]);

  if (!isOpen) return null;

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (tool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 18;
    } else {
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2.5;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[480px]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
              Rough Sheet & Scratchpad
            </span>
            <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-700 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('draw')}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === 'draw'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Canvas Pen
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === 'notes'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Rough Notes
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'draw' && (
              <>
                <button
                  onClick={() => setTool('pen')}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    tool === 'pen'
                      ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-500 hover:bg-slate-200'
                  }`}
                  title="Pen"
                >
                  <PenTool className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTool('eraser')}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    tool === 'eraser'
                      ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-500 hover:bg-slate-200'
                  }`}
                  title="Eraser"
                >
                  <Eraser className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={clearCanvas}
                  className="p-1.5 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  title="Clear Canvas"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 relative bg-white dark:bg-slate-950">
          {activeTab === 'draw' ? (
            <canvas
              ref={canvasRef}
              width={500}
              height={400}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
              className="w-full h-full cursor-crosshair touch-none bg-white"
            />
          ) : (
            <textarea
              value={roughText}
              onChange={(e) => setRoughText(e.target.value)}
              placeholder="Jot down rough steps, formulas, calculations, or key numbers..."
              className="w-full h-full p-4 bg-transparent resize-none text-sm font-mono text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          )}
        </div>
      </div>
    </div>
  );
};
