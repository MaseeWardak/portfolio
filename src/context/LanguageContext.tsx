/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Language = 'en' | 'ps' | 'fa' | 'fr'

interface LanguageContextValue {
  language: Language
  setLanguage: (next: Language) => void
  isRtl: boolean
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  isRtl: false,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('portfolio-language')
      if (stored === 'en' || stored === 'ps' || stored === 'fa' || stored === 'fr') return stored
    } catch {
      // localStorage unavailable
    }
    return 'en'
  })

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-language', language)
    } catch {
      // localStorage unavailable
    }
  }, [language])

  const isRtl = language === 'ps' || language === 'fa'

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageState,
      isRtl,
    }),
    [language, isRtl]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
