import { useEffect } from 'react'
import { Header } from './components/Header'
import { DomainSelection } from './components/DomainSelection'
import { Quiz } from './components/Quiz'
import { ScoreModal } from './components/ScoreModal'
import { useQuizStore } from './store/quizStore'

function App() {
  const { domain, selectedQuestions, currentQuestionIndex, theme, score, resetQuiz, retryQuiz } = useQuizStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  let screen = 'domain'

  if (domain !== null && selectedQuestions.length > 0) {
    if (currentQuestionIndex < selectedQuestions.length) {
      screen = 'quiz'
    } else {
      screen = 'results'
    }
  }

  const handleRetry = () => {
    retryQuiz()
  }

  const handleMainMenu = () => {
    resetQuiz()
  }

  // A simple key to force re-render/animation reset on full screen change
  const screenKey = screen + (screen === 'quiz' ? currentQuestionIndex : '')

  return (
    <div className="relative min-h-screen font-sans antialiased text-foreground selection:bg-primary/20 bg-background transition-colors duration-300">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <Header />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 lg:px-8 custom-scrollbar">
        <div key={screenKey} className="animate-fade-in-up">
          {screen === 'domain' && <DomainSelection />}
          {screen === 'quiz' && <Quiz />}
          {screen === 'results' && (
            <ScoreModal
              score={score}
              totalQuestions={selectedQuestions.length}
              onRetry={handleRetry}
              onMainMenu={handleMainMenu}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
