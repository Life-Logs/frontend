'use client'

import axios from "axios"
import { useRef, useState } from "react"
import styled from "styled-components"

export default function routineAdd() {

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [tag, setTag] = useState([])

    const tagRef = useRef();

    const DateValue = '1979. 12. 12'

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    let tagValue = ''
    const handleTagChange = (event) => {
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
        <List>이름<InputSpace onChange={(e) => handleNameChange(e)}/></List>
        <List>구분<InputSpace onChange={(e) => handleTypeChange(e)}/></List>
        {/* <List>목표</List> */}
        <List>태그<InputSpace
            ref={tagRef}
            onKeyDown={(e) => handleTagChange(e)}/>
        </List>
        <TagList>태그목록 :</TagList>
        <List>날짜및시간</List>
        <ConfirmAndCancle>
            <Cancel>취소</Cancel>
            <Confirm
            onClick={() => {
                // console.log(DataValue)
                postRoutine(DataValue)
                // console.log(name, type, tag, DateValue)
            }}>확인</Confirm>
        </ConfirmAndCancle>
    </Body>)
}

const Body = styled.div``
const List = styled.div``
const TagList = styled.div``
const InputSpace = styled.input``
const ConfirmAndCancle = styled.div``
const Confirm = styled.button``
const Cancel = styled.button``