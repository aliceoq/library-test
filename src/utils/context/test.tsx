import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useState } from 'react'

interface Props extends Partial<ContextType> {
  children: ReactNode
}
type ContextType = {
  testValue: string
  setTestValue: Dispatch<SetStateAction<string>>
}

export const LibraryContext = createContext<ContextType>({
  testValue: '',
  setTestValue: () => undefined,
})

const LibraryContextProvider = ({ children, ...props }: Props) => {
  const [testValue, setTestValue] = useState('')

  return (
    <LibraryContext.Provider
      value={{
        testValue,
        setTestValue,
        ...props,
      }}
    >
      {children}
    </LibraryContext.Provider>
  )
}

export default LibraryContextProvider
