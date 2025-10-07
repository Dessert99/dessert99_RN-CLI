import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import useForm from "@/hooks/useForm";
import { useGetAddress } from "@/hooks/useGetAddress";
import DatePicker from "react-native-date-picker";

// 네비게이션 스택에 정의된 타입(화면 목록과 각 화면의 params 타입)
import { MapStackParamList } from "@/types/navigation";
import { validateAddPost } from "@/utils/validation";

// Stack 네비게이터의 props 타입(즉, route, navigation 객체의 타입)을 가져오는 제너릭 유틸
import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";

// 현재 화면("AddLocation")이 받을 수 있는 route 파라미터의 타입을 지정
type Props = StackScreenProps<MapStackParamList, "AddLocation">;

const AddLocationScreen = ({ route }: Props) => {
  const { location } = route.params;
  const address = useGetAddress(location); // 역지오코딩
  const postForm = useForm({
    initailValue: {
      title: "",
      description: "",
      date: new Date(),
    },
    validate: validateAddPost,
  });
  const [openDate, setOpenDate] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputField
        disabled
        value={address}
      />
      <CustomButton
        label='날짜 선택'
        variant='outlined'
        onPress={() => setOpenDate(true)} // DatePicker 모달 열기
      />
      <InputField
        placeholder='제목을 입력해주세요.'
        error={postForm.errors.title}
        touched={postForm.touched.title}
        {...postForm.getTextInputProps("title")}
      />
      <InputField
        placeholder='기록하고 싶은 내용을 입력하세요. (선택)'
        multiline //여러 줄 입력 가능
        error={postForm.errors.description}
        touched={postForm.touched.description}
        {...postForm.getTextInputProps("description")}
      />
      <DatePicker
        modal
        locale='ko'
        mode='date'
        title={null}
        confirmText='완료'
        cancelText='취소'
        date={postForm.values.date}
        open={openDate}
        onCancel={() => setOpenDate(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationScreen;
