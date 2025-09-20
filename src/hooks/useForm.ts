import { useEffect, useState } from "react";

interface UseFormProps<T> {
  initailValue: T; // 제네릭
  validate: (values: T) => Record<keyof T, string>; // T 타입 값의 각 필드를 검사해 {필드명: 에러문구} 객체로 돌려주는 것
}

function useForm<T>({ initailValue, validate }: UseFormProps<T>) {
  // 입력값 상태
  const [values, setValues] = useState(initailValue);

  //선택 상태
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  //에러 상태
  const [errors, setErrors] = useState<Record<string, string>>({});

  //
  const handleChangeValue = (name: keyof T, text: string) => {
    setValues((prev) => ({ ...prev, [name]: text })); // 불변 업데이트 : 기존 상태는 펼쳐두고 변경된 부분만 수정
  };

  // 선택 유효성 검사
  const handleBlur = (name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  //텍스트 인풋 props를 묶어서 리턴
  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (value: string) => handleChangeValue(name, value);
    const onBlur = () => {
      handleBlur(name);
    };
    return { value, onChangeText, onBlur };
  };

  // 에러 객체 갱신. 값이 바뀔 때 체크해준다.
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
    console.log(newErrors);
  }, [validate, values]);

  return { values, touched, errors, getTextInputProps };
}

export default useForm;
