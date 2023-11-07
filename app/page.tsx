import Image from 'next/image'
import styles from './page.module.css'
import styled from 'styled-components'
// import 


// const Body = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   padding: 6rem;
//   min-height: 100vh;
//   background-color: #E2F2D5;
// `

export default function Home() {

  return (
    <div className={styles.main}>
      My Easy Life
      <input placeholder='이메일'/>
      <input placeholder='비밀번호'/>
      <button>로그인</button>
      <div>회원가입</div>
      <div>계정 정보를 잊으셨습니까?</div>
    </div>
  )
}

