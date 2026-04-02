import { useQuizStore } from '../store/quizStore'
import { config } from '../config'
import domain1Data from '../data/domain1.json'
import domain2Data from '../data/domain2.json'
import domain3Data from '../data/domain3.json'
import { Cloud, Server, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react'

// Define domain icons since they are static
const domainIcons = [Cloud, Server, ShieldCheck]

interface Question {
  type: 'scenario' | 'simple' | 'tf'
  question: string
  options?: string[]
  answer: string | boolean
  explanation: string
  link: string
}

interface KeyTerm {
  id: number
  term: string
  category: string
  questions: Question[]
}

const domainsData: KeyTerm[][] = [domain1Data as any, domain2Data as any, domain3Data as any]

export function DomainSelection() {
  const { setDomain, loadKeyTerms, loadCompleteExam } = useQuizStore()

  const handleSelectDomain = (index: number) => {
    setDomain(index)
    loadKeyTerms(domainsData[index])
  }

  const handleSelectCompleteExam = () => {
    setDomain('complete')
    loadCompleteExam(domainsData)
  }

  return (
    <section className="mx-auto w-full max-w-4xl py-8">
      <div className="mb-10 text-center">
        <h1 
          className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4 animate-slide-in-up opacity-0"
          style={{ animationFillMode: 'forwards' }}
        >
          Select a <span className="text-primary">Domain</span>
        </h1>
        <p 
          className="text-lg text-muted-foreground animate-fade-in opacity-0"
          style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
        >
          Choose a functional area to begin your AZ-900 preparation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {config.domains.map((domain, index) => {
          const Icon = domainIcons[index % domainIcons.length]
          return (
            <button
              key={index}
              onClick={() => handleSelectDomain(index)}
              className="group relative flex flex-col items-start rounded-2xl border border-border/50 bg-card p-6 text-left shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] animate-slide-in-up opacity-0"
              style={{ animationDelay: `${index * 100 + 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="mb-4 rounded-xl bg-primary/10 p-3 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-8 w-8" />
              </div>
              
              <h3 className="mb-2 text-xl font-bold leading-tight text-foreground">
                Domain {index + 1}
              </h3>
              
              <p className="mb-6 text-sm font-medium text-muted-foreground line-clamp-3">
                {domain}
              </p>

              <div className="mt-auto flex w-full items-center justify-between text-sm font-semibold text-primary">
                <span>Start Practice</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-12 flex justify-center w-full">
        <button
          onClick={handleSelectCompleteExam}
          className="group relative flex w-full max-w-2xl items-center justify-between rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/10 to-transparent p-6 text-left shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] animate-slide-in-up opacity-0"
          style={{ animationDelay: `400ms`, animationFillMode: 'forwards' }}
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="flex items-center gap-6">
            <div className="rounded-xl bg-primary/20 p-4 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold leading-tight text-foreground mb-1">
                Complete Exam
              </h3>
              <p className="text-base font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                All 3 Domains • 100 Questions • Exam Weighted
              </p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary">
            <span>Start Full Practice</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </button>
      </div>
    </section>
  )
}