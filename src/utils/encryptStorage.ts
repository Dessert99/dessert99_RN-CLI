import EncryptedStorage from "react-native-encrypted-storage";

//데이터를 저장하는 함수
//data는 여러 타입을 받을 수 있도록 제네릭으로 만든다.
async function setEncryptStorage<T>(key: string, data: T) {
  await EncryptedStorage.setItem(key, JSON.stringify(data)); //Json형태로 변환해서 저장
}

//데이터를 가져오는 함수
async function getEncryptStorage(key: string) {
  const storedData = await EncryptedStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null; // 이렇게 하면 빈값을 파싱하는 경우가 사라진다.
}

//데이터를 삭제하는 함수
async function removeEncryptStorage(key: string) {
  const data = await getEncryptStorage(key);

  //먼저 값이 있는지 확인부터 한다.
  if (data) {
    await EncryptedStorage.removeItem(key);
  }
}

export { setEncryptStorage, getEncryptStorage, removeEncryptStorage };
