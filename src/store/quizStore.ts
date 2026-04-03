import { create } from 'zustand'

interface Question {
  type: 'scenario' | 'simple' | 'tf' | 'easy'
  question: string
  options?: string[]
  answer: string | boolean
  explanation: string
  link: string
  term?: string
  category?: string
  domainIndex?: number
}

interface KeyTerm {
  term: string
  category: string
  questions: Question[]
}

interface QuizState {
  domain: number | 'complete' | 'easy' | null
  keyTerms: KeyTerm[]
  selectedQuestions: Question[]
  currentQuestionIndex: number
  answers: (string | boolean | null)[]
  selectedAnswer: string | boolean | null
  isAnswered: boolean
  score: number
  theme: 'light' | 'dark'
  setDomain: (domain: number | 'complete' | 'easy') => void
  loadKeyTerms: (keyTerms: KeyTerm[]) => void
  loadCompleteExam: (domainsData: KeyTerm[][], totalCount?: number) => void
  loadEasyExam: (domainsData: KeyTerm[][]) => void
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
          return { ...chosenQuestion, term: term.term, category: term.category, domainIndex: typeof get().domain === 'number' ? get().domain as number : undefined }
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
      loadCompleteExam: (domainsData, totalCount = 100) => {
        let counts = [28, 38, 34] // Default Domains 1, 2, 3 weights
        if (totalCount === 40) {
          counts = [11, 15, 14] // 27.5%, 37.5%, 35%
        } else if (totalCount === 60) {
          counts = [17, 23, 20] // ~28.3%, ~38.3%, ~33.3%
        }

        let selectedQuestions: Question[] = []
        
        domainsData.forEach((domainTerms, index) => {
          const shuffledTerms = [...domainTerms].sort(() => Math.random() - 0.5)
          const selectedTerms = shuffledTerms.slice(0, counts[index])
          const questionsForThisDomain = selectedTerms.map(term => {
            const randomIndex = Math.floor(Math.random() * term.questions.length)
            const chosenQuestion = term.questions[randomIndex]
            return { ...chosenQuestion, term: term.term, category: term.category, domainIndex: index }
          })
          selectedQuestions = [...selectedQuestions, ...questionsForThisDomain]
        })
        
        selectedQuestions.sort(() => Math.random() - 0.5) // Shuffle combined exam
        
        set({
          keyTerms: [],
          selectedQuestions,
          answers: new Array(selectedQuestions.length).fill(null),
          currentQuestionIndex: 0,
          selectedAnswer: null,
          isAnswered: false,
          score: 0
        })
      },
      loadEasyExam: (domainsData) => {
        const counts = [11, 15, 14] // Weights for 40 easy questions

        let selectedQuestions: Question[] = []
        
        domainsData.forEach((domainTerms, index) => {
          const easyQuestions = domainTerms.map(term => {
            const easyQuestion = term.questions.find(q => q.type === 'easy')
            if (easyQuestion) {
              const options = easyQuestion.options ? [...easyQuestion.options].sort(() => Math.random() - 0.5) : []
              return { ...easyQuestion, options, term: term.term, category: term.category, domainIndex: index }
            }
            return null
          }).filter(Boolean) as Question[]
          
          const shuffledEasy = [...easyQuestions].sort(() => Math.random() - 0.5)
          const selected = shuffledEasy.slice(0, counts[index])
          selectedQuestions = [...selectedQuestions, ...selected]
        })
        
        selectedQuestions.sort(() => Math.random() - 0.5)
        
        set({
          keyTerms: [],
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