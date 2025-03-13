export const NameRegex = /^[a-zA-Zа-яА-ЯёЁїЇєЄіІґҐ\s]+$/;
export const EmailRegex = /\S+@\S+\.\S+/;
export const PasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
export const PostalCodeRegex = /^\d{5}$/;
export const PhoneNumberRegex = /^\+?\d{10,15}$/;
