'use client'

import styles from './page.module.css'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiEdit } from 'react-icons/bi';
import axios from 'axios';

interface MockData {
    title: string;
    category: string;
    repeat: string;
    active: string;
    tag: string;
  }
  
export default function Routine() {
    const [fold, setFold] = useState<boolean>(false)
    const [data, setData] = useState<MockData[]>([])
    const [toggleOnOff, setToggleOnOff] = useState<boolean>(false);

    const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setToggleOnOff(!toggleOnOff);
    }

    useEffect(() => {
        axios('/data/mockData.json')
        .then((response) => {
            const responseValue = response.data.mockData
            setData(responseValue)
        })
    }, [])

    return (
        <div className={styles.main}>
            {data && data.map((e, i) => (
                <RoutineBox key={i} foldValue={fold}>
                <TitleWrap onClick={() => setFold(!fold)}>
                    <TitleAndToggle>{e.title}
                        <Toggle onClick={handleToggle}>
                            <ToggleCircle toggleOnOff={toggleOnOff}/>
                        </Toggle>
                    </TitleAndToggle>
                    {fold ? (<BiEdit size="20"/>) : ''}
                </TitleWrap>
                {fold ? (
                <div className={styles.routineBoxFold}>
                    <div className={styles.routineBoxContentWrap}>
                        <div className={styles.routineBoxContent}>
                            <div className={styles.routineMenu}>구분</div>
                            <div className={styles.routineContent}>{e.category}</div>
                        </div>
                        <div className={styles.routineBoxContent}>
                            <div className={styles.routineMenu}>반복</div>
                            <div className={styles.routineContent}>{e.repeat}</div>
                        </div>
                        <div className={styles.routineBoxContent}>
                            <div className={styles.routineMenu}>활성</div>
                            <div className={styles.routineContent}>{e.active}</div>
                        </div>
                        <hr className={styles.routineHr}/>
                        <Tag>{e.tag}</Tag>
                    </div>
                </div>
                ) : ''}
            </RoutineBox>
            ))}
        </div>
    )
}

const RoutineBox = styled.div`
    box-shadow: 2px 2px 2px 2px gray;
    width: 330px;
    min-height: ${props => (props.foldValue ? '200px' : '60px')}; // fold 값에 따라 동적으로 높이 설정
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

const Toggle = styled.div`
    width: 55px;
    height: 30px;
    background-color: #34C759;
    border-radius: 20px;
    display:flex;
    align-items: center;
    padding: 1px;
`

const ToggleCircle = styled.div`
    width: 25px;
    height: 26px;
    border-radius: 50px;
    background-color: white;
    transform: ${(props) => props.toggleOnOff ? `translateX(27px)` : ''};
    transition: 0.2s;
`

const TitleAndToggle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`