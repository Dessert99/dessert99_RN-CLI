/**
 * 참고:
 * - Airbnb의 스타일 선호는 주로 ESLint 규칙으로 제공됨.
 * - 우리는 eslint-config-prettier로 ESLint의 '포맷 관련 규칙'을 끔.
 * => 최종 포맷 소스: Prettier (이 파일의 값이 실제로 적용됨)
 */

module.exports = {
  /**
   * JSX 속성에서 작은따옴표(') 사용
   * - 일반 JS 문자열의 singleQuote와는 별개 옵션
   * - 예) <Button title='확인' />
   */
  jsxSingleQuote: true,

  /**
   * 멀티라인 JSX 태그에서 속성을 한 줄에 하나씩 배치
   * - 긴 props가 많을 때 diff 가독성 개선
   * - 예)
   *   <Input
   *     value='a'
   *     onChange={...}
   *     disabled
   *   />
   */
  singleAttributePerLine: true,

  /**
   * 멀티라인 JSX의 닫는 '>'를 마지막 속성 줄 끝에 배치
   * - true:
   *   <Card
   *     title='Hi' />
   * - false:
   *   <Card
   *     title='Hi'
   *   />
   * - (Prettier v2부터 jsxBracketSameLine → bracketSameLine로 명칭 변경)
   */
  bracketSameLine: true,

  /**
   * 줄바꿈 문자(EOL) 자동 감지
   * - 파일에 이미 사용 중인 줄바꿈(LF/CRLF)을 따라감
   * - 다른 OS와 협업 시 유용 (고정하려면 'lf' 또는 'crlf' 사용)
   */
  endOfLine: 'auto',
};
