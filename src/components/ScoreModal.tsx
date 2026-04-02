import { useEffect } from 'react'
import { Button } from './ui/button'
import confetti from 'canvas-confetti'
import { Trophy, RefreshCcw, Home } from 'lucide-react'

interface ScoreModalProps {
  score: number
  totalQuestions: number
  onRetry: () => void
  onMainMenu: () => void
}

export function ScoreModal({ score, totalQuestions, onRetry, onMainMenu }: ScoreModalProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const isPassing = percentage >= 70

  useEffect(() => {
    if (isPassing) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      return () => clearInterval(interval)
    }
  }, [isPassing])

  return (
    <div className="flex min-h-[60vh] items-center justify-center animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div 
        className="w-full max-w-md rounded-3xl border border-border/50 bg-card p-8 text-center shadow-2xl shadow-primary/10 overflow-hidden relative animate-scale-in opacity-0"
        style={{ animationFillMode: 'forwards', animationDelay: '100ms' }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-hover" />
        
        <div 
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary animate-scale-in opacity-0"
          style={{ animationFillMode: 'forwards', animationDelay: '300ms' }}
        >
          <Trophy className="h-10 w-10" />
        </div>

        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">
          {isPassing ? 'Congratulations!' : 'Keep Practicing!'}
        </h1>
        <p className="mb-6 text-muted-foreground">
          You have completed the module.
        </p>
        
        <div className="mb-8 rounded-2xl bg-secondary/50 p-6">
          <p className="mb-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">Your Score</p>
          <p 
            className={`text-6xl font-black ${isPassing ? 'text-primary' : 'text-foreground'} animate-slide-in-up opacity-0`}
            style={{ animationFillMode: 'forwards', animationDelay: '500ms' }}
          >
            {percentage}%
          </p>
          <p className="mt-2 text-sm font-medium text-muted-foreground animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '600ms' }}>
            {score} out of {totalQuestions} correct
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={onRetry} className="flex-1 rounded-xl" size="lg">
            <RefreshCcw className="mr-2 h-4 w-4" /> 
            Retry
          </Button>
          <Button onClick={onMainMenu} variant="outline" className="flex-1 rounded-xl border-border/60 hover:bg-secondary" size="lg">
            <Home className="mr-2 h-4 w-4" />
            Menu
          </Button>
        </div>
      </div>
    </div>
  )
}
