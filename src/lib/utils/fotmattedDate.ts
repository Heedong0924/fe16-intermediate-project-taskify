/**
 * UTC 기준의 ISO 8601 문자열 (예: "2025-07-26T01:36:36.000Z")을 받아
 * 'YYYY.MM.DD 오전/오후 HH:MM' 형식으로 포맷합니다.
 *
 * **타임존 변환 없이**, 입력된 UTC 시간의 숫자들을 그대로 사용하여 포맷합니다.
 * 예를 들어, '01:36'은 '오전 01:36'으로 변환됩니다.
 *
 * @param isoString UTC 기준의 ISO 8601 형식 날짜 문자열
 * @returns 포맷된 날짜 문자열 (예: "2025.07.26 오전 01:36")
 */
export const formattedDate = (isoString: string): string => {
  const date = new Date(isoString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth()는 0부터 시작
  const day = String(date.getUTCDate()).padStart(2, '0');

  let hours = date.getUTCHours(); // 0-23 범위의 UTC 시
  const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // 0-59 범위의 UTC 분

  let ampm = '오전';
  if (hours >= 12) {
    ampm = '오후';
    if (hours > 12) {
      hours -= 12;
    }
  }
  if (hours === 0) {
    hours = 12;
  }
  const formattedHours = String(hours).padStart(2, '0');

  return `${year}.${month}.${day} ${ampm} ${formattedHours}:${minutes}`;
};
