import { Button } from './ui/button'
import { useQuizStore } from '../store/quizStore'
import { Moon, Sun, Home } from 'lucide-react'

export function Header() {
  const { theme, toggleTheme, resetQuiz, domain } = useQuizStore()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo Section */}
        <div
          className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
          onClick={resetQuiz}
        >
          <div className="flex h-8 w-28 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <span className="font-bold text-lg">AZ 900</span>
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Quiz
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {domain !== null && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetQuiz}
              className="hidden sm:flex rounded-full border-border/50 bg-background/50 hover:bg-secondary transition-all"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-secondary hover:text-primary transition-all duration-300 relative overflow-hidden"
            aria-label="Toggle theme"
          >
            <div
              className={`absolute transition-all duration-300 transform ${theme === 'dark' ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
            >
              <Moon className="h-5 w-5" />
            </div>
            <div
              className={`absolute transition-all duration-300 transform ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'}`}
            >
              <Sun className="h-5 w-5" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  )
}