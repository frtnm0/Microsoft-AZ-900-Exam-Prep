import { Button } from './ui/button'
import { useQuizStore } from '../store/quizStore'
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { formatBold } from '../lib/utils'

export function Quiz() {
  const {
    selectedQuestions,
    currentQuestionIndex,
    selectedAnswer,
    isAnswered,
    answers,
    selectAnswer,
    nextQuestion,
    prevQuestion
  } = useQuizStore()

  // Use the last question as a fallback if index goes out of bounds during unmount animations.
  const question = selectedQuestions[currentQuestionIndex] || selectedQuestions[selectedQuestions.length - 1]

  const progressNext = selectedQuestions.length > 0 ? ((currentQuestionIndex + 1) / selectedQuestions.length) * 100 : 0

  if (!question) {
    return <div className="min-h-[50vh]" />
  }

  const isCorrect = answers[currentQuestionIndex] === question.answer

  const shuffledOptions = question.type !== 'tf' && question.options ? question.options : []

  return (
    <section className="mx-auto w-full max-w-3xl">
      {/* Header and Progress */}
      <div className="mb-2">
        <div className="mb-2 flex items-center justify-between text-xs font-medium">
          <span className="text-muted-foreground uppercase tracking-wider">
            Question {currentQuestionIndex + 1} of {selectedQuestions.length}
          </span>
          <span className="text-primary font-bold">{Math.round(progressNext)}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${progressNext}%` }}
          />
        </div>
      </div>

      <div
        key={currentQuestionIndex}
        className="rounded-lg border border-border/50 bg-card p-6 sm:p-8 shadow-sm animate-fade-in opacity-0"
        style={{ animationFillMode: 'forwards' }}
      >
        {/* Category*/}
        {(
          <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs tracking-wide text-primary">
            {question.category}
          </div>
        )}

        {/* Question Text */}
        <h2
          className="mb-6 text-lg font-normal leading-relaxed text-foreground"
          dangerouslySetInnerHTML={{ __html: formatBold(question.question) }}
        />

        {/* Options */}
        <div className="grid gap-3 mb-6">
          {(question.type === 'tf' ? ['True', 'False'] : shuffledOptions).map((option, index) => {
            // Adjust logic for true/false since option is 'True'/'False' but answer is boolean
            const isTF = question.type === 'tf'
            const optionValue = isTF ? (option === 'True') : option

            const isSelected = selectedAnswer === optionValue
            const isCorrectAnswer = optionValue === question.answer

            let buttonStyle = "border-border/50 bg-card hover:border-primary/50 hover:bg-primary/5"
            let textStyle = "text-foreground"

            if (isSelected) {
              if (!isAnswered) {
                // Selected but not yet submitted
                buttonStyle = "border-primary bg-primary/10 ring-2 ring-primary/20"
                textStyle = "text-primary font-medium"
              } else {
                // Answered and Selected
                if (isCorrectAnswer) {
                  buttonStyle = "border-green-500 bg-green-50 dark:bg-green-500/10 dark:border-green-500/50"
                  textStyle = "text-green-700 dark:text-green-400 font-medium"
                } else {
                  buttonStyle = "border-red-500 bg-red-50 dark:bg-red-500/10 dark:border-red-500/50"
                  textStyle = "text-red-700 dark:text-red-400 font-medium"
                }
              }
            } else if (isAnswered && isCorrectAnswer) {
              // Not selected, but is the correct answer
              buttonStyle = "border-green-500 border-dashed bg-green-50/50 dark:bg-green-500/5 dark:border-green-500/30"
              textStyle = "text-green-700 dark:text-green-400 font-medium"
            } else if (isAnswered) {
              // Not selected, answer is wrong
              buttonStyle = "border-border/30 bg-muted/50 opacity-60"
              textStyle = "text-muted-foreground"
            }

            return (
              <button
                key={index}
                onClick={() => !isAnswered && selectAnswer(optionValue)}
                disabled={isAnswered}
                className={`group relative flex w-full items-center justify-between rounded-lg border px-5 py-4 text-left transition-all duration-200 ${!isAnswered ? 'active:scale-[0.99] hover:scale-[1.01]' : ''} ${buttonStyle}`}
              >
                <span className={`text-base ${textStyle}`}>
                  {option}
                </span>

                {isAnswered && (
                  <div className="animate-scale-in opacity-0" style={{ animationFillMode: 'forwards' }}>
                    {isSelected && isCorrectAnswer && <CheckCircle2 className="h-6 w-6 text-green-500" />}
                    {isSelected && !isCorrectAnswer && <XCircle className="h-6 w-6 text-red-500" />}
                    {!isSelected && isCorrectAnswer && <CheckCircle2 className="h-6 w-6 text-green-500 opacity-50" />}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Explanation Area */}
        {isAnswered && (
          <div className="overflow-hidden animate-slide-in-up mt-4 opacity-0" style={{ animationFillMode: 'forwards' }}>
            <div className={`rounded-lg border p-4 ${isCorrect ? 'border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900/50' : 'border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50'}`}>
              <div className="mb-2 flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <><CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" /><span className="text-green-700 dark:text-green-400">Correct</span></>
                ) : (
                  <><XCircle className="h-5 w-5 text-red-600 dark:text-red-500" /><span className="text-red-700 dark:text-red-400">Incorrect</span></>
                )}
              </div>
              <p className="mb-2 text-sm leading-relaxed text-foreground/90" dangerouslySetInnerHTML={{ __html: formatBold(question.explanation) }} />
              <a
                href={question.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-medium text-primary hover:text-primary-hover hover:underline"
              >
                View Official Documentation <ArrowRight className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-border/50 pt-6">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className="w-1/3 min-w-[100px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={!isAnswered}
            className="w-2/3 shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30"
            size="lg"
          >
            Next Question <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}