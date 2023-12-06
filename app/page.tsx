import Image from 'next/image'
import styles from './page.module.css'
import styled from 'styled-components'
import Login from './login/page'

export default function Home() {

  return (
    <div className={styles.main}>
      <Login/>
    </div>
  )
}

