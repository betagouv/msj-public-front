export interface AppointmentData {
  id: number;
  datetime: string;
  state: string;
  appointment_type_name: string;
  place: {
    name: string;
    adress: string;
    phone: string;
    email: string;
    contact_method: string;
  };
}