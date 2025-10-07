// 연, 월, 일로 분리해주는 함수
export function getDateDetail(dateString: string | Date) {
  const date = new Date(dateString); // 1. Date로 변경
  const year = date.getFullYear(); // 2. 연도 가져오기
  const month = date.getMonth() + 1; // 3, 월 가져오기. 0월부터 시작해서 +1을 해줘야 한다.
  const day = date.getDate();

  return { year, month, day };
}
