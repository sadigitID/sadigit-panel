type AgendaTime = {
  /**
   * Agenda start time
   * @type {string}
   * @example "13:00"
   * @description The start time of the agenda
   */
  start: string
  /**
   * Agenda end time
   * @type {string}
   * @example "14:00"
   * @description The end time of the agenda
   */
  end: string
}

export type ParticipantType = 'badges' | 'images'

export interface AgendaCardProps {
  /**
   * Agenda title
   * @type {string}
   * @example "Meeting Website Coorporate PLN"
   * @description The title of the agenda
   */
  title: string
  /**
   * Agenda description
   * @type {string}
   * @example "Online Meeting"
   * @description The description of the agenda
   */
  description: string
  /**
   * Agenda time
   * @type {AgendaTime}
   * @example { start: "13:00", end: "14:00" }
   * @description The time of the agenda
   */
  time: AgendaTime
  /**
   * Agenda participant
   * @type {string[]}
   * @example ["FE", "BE", "UI/UX", "QA", "CS"]
   * @description The list of participant of the agenda
   */
  participants: string[]
  /**
   * Agenda participant type
   * @type {ParticipantType}
   * @example "badges"
   * @description The type of participant, can be 'badges' or 'images'
   */
  participantType: ParticipantType
  /**
   * Agenda variant
   * @type {'default' | 'active'}
   * @example "default"
   * @description The variant of the agenda card, can be 'default' or 'active'
   * @default 'default'
   */
  variant?: 'default' | 'active'
}
