export interface CompetitionParticipantModel {
  id: number;
  title: string;
  type: string;
  description: string;
  rules: string;
  instructions: string;
  userId: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  participantCount: number;
}

export interface ErrorMessage {
    message: string
}
