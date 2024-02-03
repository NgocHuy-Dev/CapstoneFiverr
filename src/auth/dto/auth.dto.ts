export class SigninDto {
    email: string;
    pass_word:string;
}
export class SignupDto {
    name: string;
    email: string;
    pass_word: string;
    phone: string;
    birth_day: string;
    gender: true;
    role: string;
    skill: [
      string
    ];
    certification: [
      string
    ]
  }