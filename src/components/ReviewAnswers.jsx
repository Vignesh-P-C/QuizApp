export default function ReviewAnswers({ questions, answers, isDark }) {
  const d = isDark;

  if (!questions || questions.length === 0) return null;

  return (
    <div className="space-y-4">
      {questions.map((q, index) => {
        const userAnswer = answers[q.id] || null;
        const isCorrect = userAnswer === q.answer;
        const isUnanswered = !userAnswer;

        return (
          <div
            key={q.id}
            className={`review-card rounded-xl border-2 p-5 transition-all duration-300 animate-fadeIn ${
              isCorrect
                ? d
                  ? 'border-green-700 bg-green-900/20'
                  : 'border-green-400 bg-green-50'
                : d
                  ? 'border-red-700 bg-red-900/20'
                  : 'border-red-400 bg-red-50'
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-4">
              {/* Question number */}
              <div
                className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  isCorrect
                    ? d
                      ? 'bg-green-800 text-green-200'
                      : 'bg-green-500 text-white'
                    : d
                      ? 'bg-red-800 text-red-200'
                      : 'bg-red-500 text-white'
                }`}
              >
                {isCorrect ? '✓' : isUnanswered ? '—' : '✗'}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold mb-3 leading-relaxed ${d ? 'text-white' : 'text-gray-900'}`}>
                  {index + 1}. {q.question}
                </p>

                {q.subject && q.chapter && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      d ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {q.subject} — {q.chapter}
                    </span>
                  </div>
                )}

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  {q.options.map((opt, optIdx) => {
                    const isUserSelection = opt === userAnswer;
                    const isCorrectAnswer = opt === q.answer;

                    let optionStyle = '';
                    if (isCorrectAnswer && isUserSelection) {
                      optionStyle = d
                        ? 'border-green-500 bg-green-900/40 text-green-200'
                        : 'border-green-500 bg-green-100 text-green-900';
                    } else if (isCorrectAnswer && !isUserSelection) {
                      optionStyle = d
                        ? 'border-green-700 bg-green-900/20 text-green-300'
                        : 'border-green-400 bg-green-50 text-green-700';
                    } else if (isUserSelection && !isCorrectAnswer) {
                      optionStyle = d
                        ? 'border-red-500 bg-red-900/40 text-red-200 line-through'
                        : 'border-red-500 bg-red-100 text-red-900 line-through';
                    } else {
                      optionStyle = d
                        ? 'border-slate-600 bg-slate-700 text-slate-400'
                        : 'border-gray-200 bg-white text-gray-500';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${optionStyle}`}
                      >
                        <span className="inline-flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center text-xs font-bold shrink-0 ${
                            isCorrectAnswer
                              ? 'bg-green-600 text-white'
                              : isUserSelection && !isCorrectAnswer
                              ? 'bg-red-600 text-white'
                              : d
                              ? 'bg-slate-600 text-slate-300'
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            {isCorrectAnswer ? '✓' : isUserSelection && !isCorrectAnswer ? '✗' : String.fromCharCode(65 + optIdx)}
                          </span>
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Status badge */}
                <div className="mt-3 flex gap-2">
                  {isCorrect ? (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      d ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                    }`}>
                      ✓ Correct
                    </span>
                  ) : isUnanswered ? (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      d ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      • Unanswered
                    </span>
                  ) : (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      d ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700'
                    }`}>
                      ✗ Incorrect
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
