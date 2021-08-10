import "./App.css";
import { UserCard } from "./components/UserCard";
import { useAllUsers } from "./hooks/useAllUsers";

function App() {
  //useAllUsersの値を受け取る
  const { getUsers, userProfiles, loading, error } = useAllUsers();

  const onClickFetchUser = () => {
    getUsers(); //useAllUsersの関数（axiosの取得）をonClickした時に取得する
  };

  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Loading....</p>
      ) : (
        //errorでもloadingでもない時
        <>
          {/**フラグメントで囲う */}
          {/**state変数のuserProfilesをmapで処理　引数で渡ってきたuserをUserCardコンポーネントのuserに渡す */}
          　
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} /> //keyを忘れずに
          ))}
        </>
      )}
    </div>
  );
}

export default App;
