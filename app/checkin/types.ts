export type Attendee = {
  id: number;
  name: string;
  createdAt: Date;
};

export type CheckinClientProps = {
    initialAttendees: string[];
    loading?: boolean;
};