//全ユーザーを一覧を取得するカスタムフック
import { useState } from "react";
import axios from "axios";

export const useAllUsers = () => {
  //axiosで取ってきたuserデータをUserCardのコンポーネント渡すようにstateに設定する
  const [userProfiles, setUserProfiles] = useState([]);
  // loadingの情報をもったstateを用意してクリック時にloadingのフラグをtrueにする.処理が終わったらfalseにする
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    //dataを取得していく関数
    setLoading(true);
    setError(false); //関数実行時は初期化
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      //thenの中でstateへの反映を書いていく
      .then((res) => {
        //受け取ったdataをmapで処理　必要なuserのdataを取得 マルっとオブジェクトで返すので({変換したOBJ})と書く
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`,
        }));
        setUserProfiles(data); //state関数setUserProfilesでstateを更新
      })
      .catch(() => {
        setError(true); //エラーがあった場合はtrue
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { getUsers, userProfiles, loading, error };
};
