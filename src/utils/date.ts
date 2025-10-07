// 연, 월, 일로 분리해주는 함수
export function getDateDetail(dateString: string | Date) {
  const date = new Date(dateString); // 1. Date로 변경
  const year = date.getFullYear(); // 2. 연도 가져오기
  const month = date.getMonth() + 1; // 3, 월 가져오기. 0월부터 시작해서 +1을 해줘야 한다.
  const day = date.getDate();

  return { year, month, day };
}

// 구분자를 받아서 날짜를 표시하는 함수
export function getDateWithSeparator(
  dateString: string | Date,
  separator: string = ""
) {
  const { year, month, day } = getDateDetail(dateString);

  return [
    year,
    String(month).padStart(2, "0"), // 문자열의 길이가 2글자가 될 때까지 왼쪽을 "0"으로 채운다.
    String(day).padStart(2, "0"),
  ].join(separator); //구분자로 합치기
}
