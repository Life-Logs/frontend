'use client'

import styles from './page.module.css'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiEdit } from 'react-icons/bi';

export default function Routine() {
    const [fold, setFold] = useState(false)

    return (
        <div className={styles.main}>
            <RoutineBox aaa={fold}>
                <TitleWrap onClick={() => setFold(!fold)}>
                    <div className={styles.routineBoxTitle}>커피</div>
                    {fold ? (<BiEdit size="20"/>) : ''}
                </TitleWrap>
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
                        <hr className={styles.routineHr}/>
                        <Tag>#음식/커피</Tag>
                    </div>
                </div>
                ) : ''}
            </RoutineBox>
        </div>
    )
}

const RoutineBox = styled.div`
    box-shadow: 2px 2px 2px 2px gray;
    width: 330px;
    min-height: ${props => (props.aaa ? '200px' : '60px')}; // fold 값에 따라 동적으로 높이 설정
    border-radius: 10px;
    padding: 20px;
    background-color: #F5FDEE;
    user-select: none;
    transition: 0.5s;
`
const TitleWrap = styled.div`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`

const Tag = styled.div`
    color: #64705B;
    font-size: 12px;
    font-weight: bold;
`