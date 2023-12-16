'use client'

import axios from "axios"
import { useRef, useState } from "react"
import styled from "styled-components"

interface RoutineAddProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function RoutineAdd({ setModal }:RoutineAddProps) {



    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [tag, setTag] = useState<boolean[]>([])
    const [selectWeek, setSelectWeek] = useState<boolean[]>([])
    const [view, setView] = useState<boolean>(false)

    const weekCycle = ['매주', '매일', '평일', '주말']

    const tagRef = useRef();

    const DateValue = '1979. 12. 12'

    const handleNameChange = (event:any) => {
        setName(event.target.value);
    };

    const handleTypeChange = (event:any) => {
        setType(event.target.value);
    };

    let tagValue = ''
    const handleTagChange = (event:any) => {
        if(event.keyCode === 13 && tagValue !== '') {
            setTag([...tag, tagValue])
            tagRef.current.value=''
        }
        else {
            tagValue = event.target.value
        }
    };

    const DataValue = {
        "name" : name,
        "type" : type,
        "datetime" : {
            "monday" : {
                "start" : "09:00",
                "end" : "18:00"
            }
        },
        "isActived": true,
        "routineTags": tag,
        "activedAt" : new Date().toISOString(),
        "inactivedAt" : new Date().toISOString(),
    }

    async function postRoutine (data) {
        try {
            const response = await axios.post('http://192.168.219.103:3000/routine', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // console.log(response);
            console.log(data)
          } catch (error) {
            console.error(error);
          }
    }

    return (
    <Body>
        <Title>루틴 추가</Title>
        <InputContents>
        <List>
            <ListTitle>이름</ListTitle>
            <InputSpace placeholder="15자 이하" onChange={(e) => handleNameChange(e)}/>
        </List>
        <List2>
            <ListTitle>구분</ListTitle>
            {/* <InputSpace onChange={(e) => handleTypeChange(e)}/> */}
        </List2>
        <List2>
            <ListTitle2>목표</ListTitle2>
                <InputSpace placeholder="숫자만 입력 가능합니다 (0 ~ 9999)" onChange={(e) => handleTypeChange(e)}/>
        </List2>
        <List2>
            <ListTitle2>태그</ListTitle2>
            <InputSpace
                placeholder="비워두면 루틴 이름으로 설정됩니다"
                ref={tagRef}
                onKeyDown={(e) => handleTagChange(e)}/>
        </List2> 
        {/* <TagList>태그목록 :</TagList> */}

        <SelectDateWrapper>
        <List>
            <ListTitle>날짜 및 시간</ListTitle>
        </List>
            <WhenStartAndDateWrapper>
                <WhenStart>언제부터 시작할까요?</WhenStart>
                <DateSelect>2023.02.10</DateSelect>
            </WhenStartAndDateWrapper>
            <DaySelectWrapper>
                <li>매주</li>
                <li>매일</li>
                <li>평일</li>
                <li>주말</li>
            </DaySelectWrapper>
        </SelectDateWrapper>





        <ConfirmAndCancle>
            <Cancel onClick={() => setModal(false)}>취소</Cancel>
            <Confirm
            onClick={() => {
                // console.log(DataValue)
                postRoutine(DataValue)
                // console.log(name, type, tag, DateValue)
            }}>저장</Confirm>
        </ConfirmAndCancle>
        </InputContents>
    </Body>)
}

const Body = styled.div`
    position: absolute;
    bottom:0;
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    z-index: 1;
`

const InputContents = styled.div`
    padding: 20px 40px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`
const List = styled.div`
    display: flex;
    flex-direction:column;
    width: 100%;
    height: fit-content;
`
const List2 = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;
`
const ListTitle = styled.p`
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 18px;
`
const ListTitle2 = styled.p`
    min-width: 45px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid black;
    padding: 0 10px 10px 0;
`

const TagList = styled.div``
const InputSpace = styled.input`
    border: none;
    border-bottom: 1px solid black;
    padding: 0 10px 10px 0;
    width: 100%;
`
const ConfirmAndCancle = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const Confirm = styled.button`
    padding: 7px 45px;
    margin-right: 20px;
    border-radius: 10px;
    color: white;
    background-color: #64705B;
    border: none;
    cursor: pointer;
`
const Cancel = styled.button`
    color: #64705B;
    background-color: white;
    cursor: pointer;
    padding: 7px 45px;
    margin-left: 20px;
    border-radius: 10px;
    border: 1px solid;
`
const Category = styled.div`
    display: flex;
    width: fit-content;
    height: fit-content;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin: 30px 0;
`
const SelectDateWrapper = styled.div`
    width: 100%;
`
const WhenStartAndDateWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const DateSelect = styled.div`
    
`
const WhenStart = styled.div``
const DaySelectWrapper = styled.div`
    margin-top: 10px;
    border: 1px solid red;
`
