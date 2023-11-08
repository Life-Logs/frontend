'use client'

import axios from 'axios'
import styles from './page.module.css'

export default function Home() {

  const GoogleLoginTest = () => {
    const cookie = document.cookie
    console.log(cookie)

    axios.get('https://lifelog.devtkim.com/auth/test-guard2', {
      headers: {
        Cookie : cookie
      }
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className={styles.main}>
      <span className={styles.title}>
      My Easy Life
      </span>
      <div className={styles.email}>
        <input className={styles.input} placeholder=' 이메일'/>
      </div>
      <div className={styles.passwordCheckBox}>
        <input className={styles.input} placeholder=' 비밀번호' type='password'/>
        <div className={styles.checkBoxWrapper}>
          <input className={styles.checkBox} type='checkbox'/> 
          <span className={styles.checkBoxText}>자동 로그인</span>
        </div>
      </div>
      <button className={styles.loginButton}>로그인</button>
      <button 
        className={styles.googleButton}
        onClick={() => GoogleLoginTest()}
      >Google로 시작하기</button>
      <div className={styles.signupForget}>
        <div className={styles.signup}>회원가입</div>
        <div className={styles.forget}>계정 정보를 잊으셨습니까?</div>
      </div>
    </div>
  )
}

