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
import { getDateWithSeparator } from "@/utils/date";
import MarkerColorInput from "@/components/MarkerColorInput";
import { colors } from "@/constants/colors";
import SliderInput from "@/components/SliderInput";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// 현재 화면("AddLocation")이 받을 수 있는 route 파라미터의 타입을 지정
type Props = StackScreenProps<MapStackParamList, "AddLocation">;

const AddLocationScreen = ({ route }: Props) => {
  const inset = useSafeAreaInsets();
  const { location } = route.params;
  const address = useGetAddress(location); // 역지오코딩
  const postForm = useForm({
    initailValue: {
      title: "",
      description: "",
      date: new Date(),
      color: colors.PINK_400,
      score: 3,
    },
    validate: validateAddPost,
  });
  const [openDate, setOpenDate] = useState(false);

  // 폼 제출
  const handleSubmit = () => {
    console.log(postForm.values);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: inset.bottom + 100 }, // 작은 기기에는 폼과 제출 버튼이 겹칠 수도 있으니 충분한 공간 띄우기
        ]}>
        <InputField
          disabled
          value={address}
        />
        <CustomButton
          label={getDateWithSeparator(postForm.values.date, ". ")} // 날짜 선택하면 변경
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
        <MarkerColorInput
          color={postForm.values.color}
          onChangeColor={(value) => postForm.onChange("color", value)}
          score={postForm.values.score}
        />
        <SliderInput
          score={postForm.values.score}
          onChangeScore={(value) => postForm.onChange("score", value)}
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
          onConfirm={(date) => {
            postForm.onChange("date", date);
          }}
          onCancel={() => setOpenDate(false)}
        />
      </ScrollView>
      <FixedBottomCTA
        label='제출'
        onPress={handleSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationScreen;
