'use client';

import axios from 'axios';
import styles from './page.module.css';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import KakaoLogin from 'react-kakao-login';

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  // const Rest_api_key = `${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`; //REST API KEY
  // const redirect_uri = `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`; //Redirect URI
  // oauth 요청 URL
  // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}`;
  // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const kakaoOnSuccess = async (data) => {
    try {
      // console.log(data);
      const idToken = data.response.access_token;
      const rqData = {
        accessToken: idToken,
      };
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        rqData
      );
      console.log(result);
      if (result.status === 201) {
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('refreshToken', result.data.refreshToken);
        localStorage.setItem('userID', result.data.userid);
        window.location.href = `http://localhost:3000/routine`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const kakaoOnFailure = (error) => {
    console.log(error);
  };
  // const handleLogin = async () => {
  //   window.location.href = kakaoURL;
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get('code');

  //   if (code) {
  //     try {
  //       const tokenResponse = await axios.post(
  //         'https://kauth.kakao.com/oauth/token',
  //         {
  //           grant_type: 'authorization_code',
  //           client_id: Rest_api_key,
  //           redirect_uri: redirect_uri,
  //           code: code,
  //         }
  //       );

  //       const accessToken = tokenResponse.data.access_token;
  //       console.log('Access Token:', accessToken);

  // 여기에서 액세스 토큰을 사용하여 카카오 API 호출 또는 필요한 작업 수행
  // 예: 사용자 정보 가져오기
  // const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });

  // setUserInfo(userInfoResponse.data);
  // setIsLogin(true);
  // } catch (error) {
  //   console.error('Error getting access token:', error);
  // }
  // console.log(urlParams);
  // const code = urlParams.get('code');
  // console.log('Code:', code);
  // const AUTHORIZATION_CODE: string = new URL(
  //   document.location.toString()
  // ).searchParams.get('code') as string;
  // console.log(AUTHORIZATION_CODE);
  // axios
  //   .get(kakaoURL)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //   }
  // };

  return (
    <div className={styles.main}>
      <span className={styles.title}>My Easy Life</span>
      <div className={styles.email}>
        <input className={styles.input} placeholder=' 이메일' />
      </div>
      <div className={styles.passwordCheckBox}>
        <input
          className={styles.input}
          placeholder=' 비밀번호'
          type='password'
        />
        <div className={styles.checkBoxWrapper}>
          <input className={styles.checkBox} type='checkbox' />
          <span className={styles.checkBoxText}>자동 로그인</span>
        </div>
      </div>
      {/* <button className={styles.loginButton} onClick={test}>
        로그인
      </button> */}
      {/* <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
            window.location.href = '/routine';
          }}
          onError={() => {
            console.log('aaa');
          }}
          useOneTap
        />
      </GoogleOAuthProvider> */}
      {/* <div onClick={handleLogin}>
        <img src='https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg' />
      </div> */}
      <KakaoLogin
        token={process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      />

      <div className={styles.signupForget}>
        <div className={styles.signup}>회원가입</div>
        <div className={styles.forget}>계정 정보를 잊으셨습니까?</div>
      </div>
    </div>
  );
}
