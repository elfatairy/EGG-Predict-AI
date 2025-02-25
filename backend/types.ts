export type Doctor = {
    uid: string,
    name: string,
    gender: 'male' | 'female',
    medicalSpecialties: string
}

export type Medication = {
  name: string,
  amount: string, 
  time: number,
  frequency: `${number | ''}${Unit}`
}

export type Patient = {
    uid: string,
    name: string,
}

export type Unit = 'h' | 'd' | 'one-time';
