import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthState, Admin } from '@/types/index'

type AuthStore = AuthState & {
    login: (admin: Admin, token: string) => void
    logout: () => void
    setIsLoading: (loading: boolean) => void
};

const initialState: AuthState = {
    admin: null,
    token: null,
    isAuthenticated: false, 
    isLoading: false,
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            ...initialState,
            login: (admin, token) => set(() => ({
                admin,
                token, 
                isAuthenticated: true,
                isLoading: false,
            })),
            logout: () => set(() => ({
                ...initialState
            })),
            setIsLoading: (loading) => set(() => ({
                isLoading: loading
            })),
        }),
        {
            name: 'megacoop-auth',
            partialize: (state) => ({ 
                admin: state.admin, 
                token: state.token, 
                isAuthenticated: state.isAuthenticated 
            })
        }
    )
)



// import { create } from 'zustand'
// import type {AuthState, User } from '@/types/index'


// type AuthStore = AuthState & {
//   login: (user: User, token: string) => void
//   logout: () => void
//   setIsLoading: (loading: boolean) => void
// };


// const initialState: AuthState = {
//     user: null,
//     token: null,
//     isAuthenticated: false, 
//     isLoading: false,
// }


// export const useAuthStore = create<AuthStore>((set) => ({
//     ...initialState,
//     login: (user, token) => set(() => ({
//         user,
//         token, 
//         isAuthenticated: true,
//         isLoading: false,
//     })),
//     logout: () => set(() => ({
//         ...initialState
//     })),
//     setIsLoading: (loading) => set(() => ({
//         isLoading: loading
//     })),

    
// }))
