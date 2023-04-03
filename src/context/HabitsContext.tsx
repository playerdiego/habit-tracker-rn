import React, { createContext } from 'react';

interface HabitsContextProps {

}

export const HabitsContext = createContext<HabitsContextProps>({} as HabitsContextProps);


export default function HabitsProvider({ children }: {children: React.ReactNode}) {
  return (
    <HabitsContext.Provider value={{

    }}>
        {children}
    </HabitsContext.Provider>
  )
}