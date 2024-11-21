export interface UserProfile {
    name: string,
    image: string
}

export interface RegisterUser {
    fullname: string;
    email:string;
    avatar: string | ArrayBuffer | null | File;
    avatarUrl: string;
    password: string;
    dob: string;
    gender: string;
    monthlyIncome: string;
    creditDate: string;
    confirmPassword: string;
  }

export interface User {
    id: string;
    fullname: string;
    email:string;
    avatar: string;
    dob: string;
    gender: string;
    budget: number;
    monthlyIncome: number;
    creditDate: number;
    createdAt: string;
    updatedAt: string;
}