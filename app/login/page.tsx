"use client";

import axios from "axios";
import styles from "./page.module.css";
// import GoogleLogin from "react-google-login";
import React, { useState, useEffect, useCallback } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function Home() {
  const clientIDValue =
    "383755203832-asb9rbs3f5v1eenk4al5cjlud9ieqim5.apps.googleusercontent.com";

  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  // const test = () => {
  //   console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  //   window.location.href ="https://accounts.google.com/o/oauth2/auth?" +
  //   "client_id={클라이언트 ID}&"+
  //   "redirect_uri={리디렉션 URI}&"+
  //   "response_type=token&"+
  //   "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
  // };

  // const googleLogin = useCallback((response) => {
  //   const userInfo = {
  //     profileImg: response.profileObj.imageUrl,
  //     email: response.profileObj.email,
  //     name: response.profileObj.name,
  //   };
  //   setUserInfo(userInfo);
  //   setIsLogin(true);
  // }, []);

  return (
    <div className={styles.main}>
      <span className={styles.title}>My Easy Life</span>
      <div className={styles.email}>
        <input className={styles.input} placeholder=" 이메일" />
      </div>
      <div className={styles.passwordCheckBox}>
        <input
          className={styles.input}
          placeholder=" 비밀번호"
          type="password"
        />
        <div className={styles.checkBoxWrapper}>
          <input className={styles.checkBox} type="checkbox" />
          <span className={styles.checkBoxText}>자동 로그인</span>
        </div>
      </div>
      {/* <button className={styles.loginButton} onClick={test}>
        로그인
      </button> */}
      <GoogleOAuthProvider clientId={clientIDValue}>
        <GoogleLogin
          onSuccess={res => {
            console.log(res);
            // window.location.href='/routine'
          }}
          onError={() => {
            console.log('aaa')
          }}
          useOneTap
        />
      </GoogleOAuthProvider>
      <div className={styles.signupForget}>
        <div className={styles.signup}>회원가입</div>
        <div className={styles.forget}>계정 정보를 잊으셨습니까?</div>
      </div>
    </div>
  );
}
