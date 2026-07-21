export default function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  isDark,
}) {
  const d = isDark;

  return (
    <div className="question-enter">
      <h2 className={`text-xl font-bold mb-6 leading-relaxed typewriter-text ${d ? 'text-white' : 'text-gray-900'}`}>
        {question.question}
      </h2>

      {/* Keyboard hint */}
      <p className={`text-xs font-medium mb-4 ${d ? 'text-slate-500' : 'text-gray-400'}`}>
        Press <kbd className={`px-1.5 py-0.5 rounded text-xs font-bold ${
          d ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600'
        }`}>1</kbd>–<kbd className={`px-1.5 py-0.5 rounded text-xs font-bold ${
          d ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600'
        }`}>4</kbd> to select, <kbd className={`px-1.5 py-0.5 rounded text-xs font-bold ${
          d ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600'
        }`}>←</kbd> <kbd className={`px-1.5 py-0.5 rounded text-xs font-bold ${
          d ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600'
        }`}>→</kbd> to navigate, <kbd className={`px-1.5 py-0.5 rounded text-xs font-bold ${
          d ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600'
        }`}>Enter</kbd> to submit
      </p>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          return (
            <button
              key={index}
              onClick={() => onSelectAnswer(option)}
              className={`option-enter w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-left font-medium text-sm ${
                isSelected
                  ? d
                    ? 'border-indigo-400 bg-indigo-800/80 text-white option-selected'
                    : 'border-indigo-500 bg-indigo-100 text-indigo-900 option-selected'
                  : d
                  ? 'border-slate-600 bg-slate-700/50 text-slate-200 hover:border-indigo-400 hover:bg-slate-600/80'
                  : 'border-gray-200 bg-white/80 text-gray-800 hover:border-indigo-400 hover:bg-indigo-50/60'
              }`}
            >
              <span
                className={`inline-flex w-8 h-8 rounded-full items-center justify-center text-sm font-bold mr-3 shrink-0 transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : d
                    ? 'bg-slate-600 text-slate-300'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}