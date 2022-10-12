export interface Registration {
    name: string,
    email: string,
    password: string,
    profilePhoto: Blob,
    bio: string,
    currentJob: string,
    currentCompany: string,
    previousCompany: string,
    education: string,
    skills: Skills[],
    websites: Websites[],
    file01: File,
    file01Description: string,
    file02: FormData,
    file02Description: string,
    file03: FormData,
    file03Description: string
}

export interface Skills {
    name: string,
    rating: number
}

export interface Websites {
    name: string,
    url: string
}