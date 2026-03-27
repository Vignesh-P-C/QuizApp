export default function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  isDark,
}) {
  const d = isDark;

  return (
    <div>
      <h2 className={`text-xl font-bold mb-6 leading-relaxed ${d ? 'text-white' : 'text-gray-900'}`}>
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          return (
            <button
              key={index}
              onClick={() => onSelectAnswer(option)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left font-medium text-sm ${
                isSelected
                  ? d
                    ? 'border-blue-500 bg-blue-900/40 text-blue-200'
                    : 'border-blue-600 bg-blue-50 text-blue-900'
                  : d
                  ? 'border-slate-600 bg-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-650'
                  : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span
                className={`inline-flex w-7 h-7 rounded-full items-center justify-center text-xs font-bold mr-3 shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white'
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