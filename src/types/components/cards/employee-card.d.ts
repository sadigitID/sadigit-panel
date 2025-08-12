export type EmployeeCardStatus = 'Present' | 'Absent' | 'Late' | 'Unconfirmed' | 'WFH'

export interface EmployeeCardProps {
  /**
   * The image path of the employee profile.
   * @type {string}
   * @example "/images/employee.jpg"
   * @description The image path of the employee profile. This will be displayed as the main image on the card.
   * @default "@/assets/images/default-profile.png"
   */
  imagePath?: string
  /**
   * The name of the employee.
   * @type {string}
   * @example "John Doe"
   * @description The name of the employee. This will be displayed as the title on the card.
   */
  name: string
  /**
   * The description of the employee.
   * @type {string}
   * @example "Software Engineer"
   * @description The description of the employee. This will be displayed as the subtitle on the card.
   */
  description: string
  /**
   * Determines if the employee is on cleaning duty.
   * @type {boolean}
   * @example true
   * @description Determines if the employee is on cleaning duty. This will be used to style the card.
   * @default false
   */
  isOnCleaningDuty?: boolean
  /**
   * Status of the employee.
   * @type {EmployeeCardStatus}
   * @example "Present"
   * @description The status of the employee. This will be displayed as a badge on the card.
   */
  status: EmployeeCardStatus
}
