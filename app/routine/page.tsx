'use client'

import styles from './page.module.css'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Routine() {
    const [fold, setFold] = useState(false)

    return (
        <div className={styles.main}>
            <RoutineBox aaa={fold}>
                <div className={styles.routineBoxTitle} onClick={() => setFold(!fold)}>커피</div>
                {fold ? (
                    <div className={styles.routineBoxFold}>
                    <div className={styles.routineBoxContentWrap}>
                        <div className={styles.routineBoxContent}>
                            <div className={styles.routineMenu}>구분</div>
                            <div className={styles.routineContent}>카운트</div>
                        </div>
                        <div className={styles.routineBoxContent}>
                            <div className={styles.routineMenu}>반복</div>
                            <div className={styles.routineContent}>평일</div>
                        </div>
                        <div className={styles.routineBoxContent}>
                            <div className={styles.routineMenu}>활성</div>
                            <div className={styles.routineContent}>2023.01.01</div>
                        </div>
                    </div>
                    <hr className={styles.routineHr}/>
                    <div className={styles.tag}>#음식/커피</div>
                </div>
                ) : ''}
            </RoutineBox>
        </div>
    )
}

const RoutineBox = styled.div`
    box-shadow: 2px 2px 2px 2px gray;
    width: 338px;
    height: ${props => (props.aaa ? '200px' : '60px')}; // fold 값에 따라 동적으로 높이 설정
    border-radius: 10px;
    padding: 20px;
    background-color: #F5FDEE;
    user-select: none;
`
