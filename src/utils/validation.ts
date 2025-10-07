// 유효성에서도 중복되는 부분이 있으니 함수 만들어서 사용해도 된다.

// 로그인 유효성
function validateLogin(values: { email: string; password: string }) {
  // 빈 error객체 -> 에러 생기면 값 채우기
  const errors = {
    email: "",
    password: "",
  };
  // 이메일 정규표현식
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }
  if (values.password.length < 8) {
    errors.password = "비밀번호는 8~20자 이내로 입력해주세요";
  }
  return errors;
}

// 회원가입 유효성
function validateSignUp(values: {
  email: string;
  password: string;
  passwordConfirm: string;
}) {
  const errors = {
    email: "",
    password: "",
    passwordConfirm: "",
  };
  // 이메일 정규표현식
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }
  if (values.password.length < 8) {
    errors.password = "비밀번호는 8~20자 이내로 입력해주세요";
  }

  if (values.passwordConfirm !== values.password) {
    errors.password = "비밀번호가 다릅니다.";
  }
  return errors;
}

//입력을 해야 넘어갈 수 있는 유효성 검사
function validateAddPost(values: { title: string }) {
  const errors = {
    title: "",
    description: "",
  };

  // 제목이 빈 문자열이면 에러 추가
  if (values.title.trim() === "") {
    errors.title = "제목은 1~30자 이내로 입력해주세요.";
  }

  return errors;
}

export { validateLogin, validateSignUp, validateAddPost };
