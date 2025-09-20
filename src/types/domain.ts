interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  imageUri: string | null;
  loginType: "email" | "kakao" | "apple";
}

export type { Profile };
