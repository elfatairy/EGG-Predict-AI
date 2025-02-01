export type Doctor = {
    uid: string,
    name: string,
    gender: 'male' | 'female',
    medicalSpecialties: string
}

export type Patient = {
    uid: string,
    name: string,
}