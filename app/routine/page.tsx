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
    const [fold, setFold] = useState<boolean[]>([])
    const [data, setData] = useState<MockData[]>([])
    const [toggleOnOff, setToggleOnOff] = useState<boolean>([]);

    const handleToggle = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
        e.stopPropagation();
        const toggleValue = [...toggleOnOff];
        toggleValue[i] = !toggleValue[i];
        setToggleOnOff(toggleValue);
    }

    useEffect(() => {
        axios('/data/mockData.json')
        .then((response) => {
            const responseValue = response.data.mockData
            const toggleArr = Array(responseValue.length).fill(false);

            setToggleOnOff(toggleArr)
            setFold(toggleArr)
            setData(responseValue)
        })
    }, [])

    return (
        <div className={styles.main}>
            {data && data.map((e, i) => (
                <RoutineBox routineBoxColor={toggleOnOff[i]} key={i} foldValue={fold[i]}>
                <TitleWrap onClick={() => {
                    const newFold = [...fold]
                    newFold[i] = !newFold[i]
                    setFold(newFold)
                }}>
                    <TitleAndToggle >{e.title}
                    {!fold[i] ?
                    (
                        <>
                            <Tags>{e.tag}</Tags>
                                <Toggle toggleColor={toggleOnOff[i]} onClick={(e) => handleToggle(e, i)}>
                                    <ToggleCircle  toggleOnOff={toggleOnOff[i]}/>
                                </Toggle>
                        </>
                    ) : ''}
                    </TitleAndToggle>
                    {fold[i] ? (<BiEdit size="20"/>) : ''}
                </TitleWrap>
                {fold[i] ? (
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
            <AddButtonWrapper>
                <AddButton onClick={() => {
                    window.location.href='/routineAdd'
                }}>+</AddButton>
            </AddButtonWrapper>
        </div>
    )
}

const RoutineBox = styled.div`
    box-shadow: 2px 2px 2px 2px gray;
    width: 330px;
    min-height: ${props => (props.foldValue ? '200px' : '60px')}; // fold 값에 따라 동적으로 높이 설정
    border-radius: 10px;
    padding: 20px;
    background-color: ${(props) => props.routineBoxColor ? '#F5FDEE' : '#C5D0BC'};
    /* background-color: #F5FDEE; */
    user-select: none;
    transition: 0.5s;
    border: none;
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
    background-color: ${(props) => props.toggleColor ? '#34C759' : '#64705B'};
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

const AddButtonWrapper = styled.div`
    display:flex;
    justify-content: end;
    width: 330px;
    /* border: 1px solid red; */
`

const AddButton = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: none;
    font-size: 32px;
    font-weight: lighter;
    background-color: black;
    color: white;
`

const Tags = styled.p`
    color: #64705B;
    font-size: 12px;
`