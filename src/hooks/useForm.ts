import { useState } from "react";

interface UseFormProps<T> {
  initailValue: T; // 제네릭
}

function useForm<T>({ initailValue }: UseFormProps<T>) {
  // 입력값 상태
  const [values, setValues] = useState(initailValue);

  //선택 상태
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  //에러 상태
  const [errors, setErrors] = useState<Record<string, boolean>>({});

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

  return { values, touched, errors, getTextInputProps };
}

export default useForm;
