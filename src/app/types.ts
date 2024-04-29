export interface Pagination {
  page: number,
  totalPages: number,
  totalElements: number,
  pageSize: number
}

export interface Account {
  id: number
  email: string,
  firstName: string,
  lastName: string,
  role: string,
  status: "ACTIVE" | "INACTIVE"
  avatarLink: string
}

export interface Student {
  id: number,
  birthDate: string,
  phone: string,
  highSchool : {
    id: number,
    name: string,
    description: string
  }
}

export interface StudentRecord {
  studentRecords: [{
    id: number,
    studentId: number,
    subject: {
      id: number,
      name: string,
      description: string
    },
    mark: number
  }]
}

export interface Institution {
  id: number,
  name: string,
  code: string,
  avatarLink: string
  websites: {
    value: string
    title: string | undefined
  }
  emails: [{
    value: string
    title: string | undefined
  }]
  phones: [{
    value: string
    title: string | undefined
  }]
  addresses: [{
    id: number,
    houseNumber: string,
    streetName: string,
    ward: string,
    district: string,
    cityProvince: string
  }]
}

export interface AdmissionPlans {
  id: number,
  name: string,
  year: number
  institution: Institution
}
export interface Department {
  id: number,
  name: string,
  code: string
  description?: string
}

export interface Major {
  id: number,
  name: string,
  code: string
  description: string
  department: Department
}
export interface AdmissionTrainingPrograms {
  id: number,
  name: string,
  trainingProgram: {
    name: string,
    id: number
  }
}

export interface AdmissionMajorMethods {
  id: number,
  name: string,
  admissionMethod: Methods
  subjectGroups: {
    id: number,
    code: string,
  }[]
}

export interface AdmissionMajors {
  id: string,
  admissionMajorMethods: AdmissionMajorMethods[],
  name: string,
  description: string,
  admissionTrainingProgram: AdmissionTrainingPrograms,
  quota: number
  major: {
    id: number,
    name: string,
    code: string
  }
}

export interface AdmissionDetails {
  id: number,
  admissionMajors: AdmissionMajors[],
  admissionTrainingPrograms: AdmissionTrainingPrograms[],
  description: string,
  institution: Institution,
  name: string,
  year: number
}

export interface SubjectGroup {
  id: number,
  code: string,
  subjects: string[]
}

export interface Methods {
  id: number,
  name: string,
  code: string,
  description: string
}

export interface Highschool {
  id: number,
  name: string,
  description: string,
  cityProvince: {
    id: number,
    name: string,
  },
}