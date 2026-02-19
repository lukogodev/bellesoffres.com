'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AuthUser {
    id: string;
    firstName: string;
    shopName: string;
    email: string;
    avatar?: string;
    whatsapp: string;
    country: string;
    city: string;
    bio: string;
}

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (data: Partial<AuthUser> & { password: string }) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data
const MOCK_USER: AuthUser = {
    id: '1',
    firstName: 'Marie',
    shopName: 'Belle Mode',
    email: 'marie@example.com',
    avatar: '',
    whatsapp: '243900000000',
    country: 'RD Congo',
    city: 'Kinshasa',
    bio: 'Spécialiste en mode et beauté, produits de qualité premium importés directement. Livraison rapide dans toute la RDC.',
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Vérifier si l'utilisateur est déjà connecté (via localStorage)
        const stored = localStorage.getItem('bellesoffres_user');
        if (stored) {
            try { setUser(JSON.parse(stored)); } catch { }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Mock login — remplacer par appel Supabase plus tard
        if (email && password.length >= 6) {
            const loggedUser = { ...MOCK_USER, email };
            setUser(loggedUser);
            localStorage.setItem('bellesoffres_user', JSON.stringify(loggedUser));
            return true;
        }
        return false;
    };

    const register = async (data: Partial<AuthUser> & { password: string }): Promise<boolean> => {
        // Mock register
        const newUser: AuthUser = {
            id: Date.now().toString(),
            firstName: data.firstName || '',
            shopName: data.shopName || '',
            email: data.email || '',
            avatar: data.avatar || '',
            whatsapp: data.whatsapp || '',
            country: data.country || 'RD Congo',
            city: data.city || 'Kinshasa',
            bio: data.bio || '',
        };
        setUser(newUser);
        localStorage.setItem('bellesoffres_user', JSON.stringify(newUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('bellesoffres_user');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
