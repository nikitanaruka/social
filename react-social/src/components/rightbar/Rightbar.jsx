import "./rightbar.css";
import {Users} from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.jpg" alt="" />
          <span className="birthdayText">
            <b>Prachi vijay</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.jpg" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => {
            return <Online key={u.id} user={u} />
          })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={`${PF}persons/10.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}persons/2.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Rahima de</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}persons/3.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Carryminati</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}persons/4.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Bhuvan Bam</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}persons/5.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Jesila Joshua</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}persons/6.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Flying Beast</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}persons/8.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Mumbiker</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}persons/9.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">gorqrty</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
