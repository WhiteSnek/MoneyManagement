export interface UserProfile {
    name: string,
    image: string
}

export interface RegisterUser {
    fullname: string;
    username: string;
    email:string;
    avatar: string | ArrayBuffer | null | File;
    avatarUrl: string;
    password: string;
    dob: string;
    gender: string;
    monthlyIncome: string;
    creditDate: string;
  }

export interface User {
    fullname: string;
    username: string;
    email:string;
    avatar: string;
    dob: string;
    gender: string;
    monthlyIncome: string;
    creditDate: string;
}