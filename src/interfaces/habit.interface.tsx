export interface Habit {
    title: string,
    description?: string,
    daysToShow: {
        monday?: boolean;
        tuesday?: boolean;
        wednesday?: boolean;
        thursday?: boolean;
        friday?: boolean;
        saturday?: boolean;
        sunday?: boolean;
    },
    icon: string,
    id?: string,
    total: number
}

export interface TodayHabit {
    title: string,
    description?: string,
    icon: string,
    completed: boolean,
    id?: string
}

export interface HistoryItem {
    day: string,
    data: TodayHabit[]
}
