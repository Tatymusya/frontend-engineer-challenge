export interface ErrorPageProps {
  error?: Error
  status?: number
  statusText?: string
}

export interface MaintenancePageProps {
  countdownTo?: Date
  showCountdown?: boolean
  message?: string
  contactEmail?: string
}

export interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}