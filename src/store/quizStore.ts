import { create } from 'zustand'

interface Question {
  type: 'scenario' | 'simple' | 'tf'
  question: string
  options?: string[]
  answer: string | boolean
  explanation: string
  link: string
  term?: string
  category?: string
}

interface KeyTerm {
  term: string
  category: string
  questions: Question[]
}

interface QuizState {
  domain: number | null
  keyTerms: KeyTerm[]
  selectedQuestions: Question[]
  currentQuestionIndex: number
  answers: (string | boolean | null)[]
  selectedAnswer: string | boolean | null
  isAnswered: boolean
  score: number
  theme: 'light' | 'dark'
  setDomain: (domain: number) => void
  loadKeyTerms: (keyTerms: KeyTerm[]) => void
  selectAnswer: (answer: string | boolean) => void
  nextQuestion: () => void
  prevQuestion: () => void
  resetQuiz: () => void
  retryQuiz: () => void
  toggleTheme: () => void
}

export const useQuizStore = create<QuizState>()((set, get) => ({
      domain: null,
      keyTerms: [],
      selectedQuestions: [],
      currentQuestionIndex: 0,
      answers: [],
      selectedAnswer: null,
      isAnswered: false,
      score: 0,
      theme: 'light',
      setDomain: (domain) => set({ domain }),
      loadKeyTerms: (keyTerms) => {
        const shuffledKeyTerms = [...keyTerms].sort(() => Math.random() - 0.5)
        const selectedQuestions = shuffledKeyTerms.map(term => {
          const randomIndex = Math.floor(Math.random() * term.questions.length)
          const chosenQuestion = term.questions[randomIndex]
          return { ...chosenQuestion, term: term.term, category: term.category }
        })
        console.log('loadKeyTerms', keyTerms, selectedQuestions)
        set({
          domain: get().domain,
          keyTerms,
          selectedQuestions,
          answers: new Array(selectedQuestions.length).fill(null),
          currentQuestionIndex: 0,
          selectedAnswer: null,
          isAnswered: false,
          score: 0
        })
      },
      selectAnswer: (answer) => {
        const { currentQuestionIndex, selectedQuestions, answers, score } = get()
        const question = selectedQuestions[currentQuestionIndex]
        const isCorrect = answer === question.answer
        answers[currentQuestionIndex] = answer
        set({
          selectedAnswer: answer,
          answers: [...answers],
          isAnswered: true,
          score: isCorrect ? score + 1 : score
        })
      },
      nextQuestion: () => {
        const { currentQuestionIndex, selectedQuestions } = get()
        if (currentQuestionIndex < selectedQuestions.length) {
          set({
            currentQuestionIndex: currentQuestionIndex + 1,
            selectedAnswer: null,
            isAnswered: false
          })
        }
      },
      prevQuestion: () => {
        const { currentQuestionIndex } = get()
        if (currentQuestionIndex > 0) {
          set({
            currentQuestionIndex: currentQuestionIndex - 1,
            selectedAnswer: null,
            isAnswered: false
          })
        }
      },
      resetQuiz: () => set({
        currentQuestionIndex: 0,
        answers: [],
        selectedAnswer: null,
        isAnswered: false,
        score: 0,
        keyTerms: [],
        selectedQuestions: [],
        domain: null
      }),
      retryQuiz: () => {
        const { selectedQuestions } = get()
        set({
          currentQuestionIndex: 0,
          answers: new Array(selectedQuestions.length).fill(null),
          selectedAnswer: null,
          isAnswered: false,
          score: 0
        })
      },
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
    })
)