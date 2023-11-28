"use client";

import axios from "axios";
import styles from "./page.module.css";
import React, { useState, useEffect, useCallback } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

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
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY}>
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
