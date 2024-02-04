'use client';

import styles from './page.module.css';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiEdit } from 'react-icons/bi';
import axios from 'axios';
import RoutineAdd from '../routineAdd/page';
import RoutineEdit from '../routineEdit/page';

interface MockData {
  name: string;
  type: string;
  repeat: string;
  activedAt: string;
  tag: string;
}

export default function Routine() {
  const [fold, setFold] = useState<boolean[]>([]);
  const [data, setData] = useState<MockData[]>([]);
  // const [toggleOnOff, setToggleOnOff] = useState<boolean[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);

  const handleRemoveRoutine = async (e) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios
        .delete(`https://dev.lifelog.devtkim.com/routine/${e.id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    e.stopPropagation();
    const dataValue = [...data];
    // const toggleOnOffValue = [...toggleOnOff]
    dataValue[i].isActived = !dataValue[i].isActived;
    // !toggleOnOffValue[i]
    const token = localStorage.getItem('accessToken');
    axios
      .patch(
        `https://dev.lifelog.devtkim.com/routine/${dataValue[i].id}/toggle-activation`,
        {
          isActived: dataValue[i].isActived,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(dataValue);
    setData(dataValue);
    // setToggleOnOff(dataValue);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    axios({
      method: 'get',
      url: 'https://dev.lifelog.devtkim.com/routine',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const responseValue = response.data;
        const toggleArr = [];
        toggleArr.push(
          responseValue.map((e) => {
            return e.isActived ? true : false;
          })
        );
        setFold(Array(responseValue.length).fill(false));
        setData(responseValue);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  return (
    <Body>
      <WebSize>
        <RoutineName>루틴</RoutineName>
        <ActiveRemove onClick={() => setRemoveMode(!removeMode)}>
          삭제
        </ActiveRemove>
        {modal && <RoutineAdd setModal={setModal} />}
        {editModal && <RoutineEdit setEditModal={setEditModal} />}
        <RoutineBoxWrapper>
          {data &&
            data.map((e, i) => (
              <RoutineBox
                routineBoxColor={data[i].isActived}
                key={i}
                foldValue={fold[i]}
              >
                {removeMode ? (
                  <RemoveButton onClick={() => handleRemoveRoutine(e)}>
                    X
                  </RemoveButton>
                ) : (
                  ''
                )}

                <TitleWrap
                  onClick={() => {
                    const newFold = [...fold];
                    newFold[i] = !newFold[i];
                    setFold(newFold);
                  }}
                >
                  <TitleAndToggle>
                    {e.name}
                    {!fold[i] ? (
                      <>
                        <Tags>
                          {e.routineTags.map((el) => {
                            return '#' + el + ' ';
                          })}
                        </Tags>
                        <Toggle
                          toggleColor={data[i].isActived}
                          onClick={(e) => handleToggle(e, i)}
                        >
                          <ToggleCircle toggleOnOff={data[i].isActived} />
                        </Toggle>
                      </>
                    ) : (
                      ''
                    )}
                  </TitleAndToggle>
                  {fold[i] ? (
                    <BiEdit
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('aa');
                        setEditModal(!editModal);
                      }}
                      size='20'
                    />
                  ) : (
                    ''
                  )}
                </TitleWrap>
                {fold[i] ? (
                  <div className={styles.routineBoxFold}>
                    <div className={styles.routineBoxContentWrap}>
                      <div className={styles.routineBoxContent}>
                        <div className={styles.routineMenu}>구분</div>
                        <div className={styles.routineContent}>{e.type}</div>
                      </div>
                      <div className={styles.routineBoxContent}>
                        <div className={styles.routineMenu}>반복</div>
                        <div className={styles.routineContent}>{e.repeat}</div>
                      </div>
                      <div className={styles.routineBoxContent}>
                        <div className={styles.routineMenu}>활성</div>
                        <div className={styles.routineContent}>
                          {e.activedAt}
                        </div>
                      </div>
                      <hr className={styles.routineHr} />
                      <Tag>{e.tag}</Tag>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </RoutineBox>
            ))}
        </RoutineBoxWrapper>
        <AddButtonWrapper>
          <AddButton
            onClick={() => {
              setModal(!modal);
            }}
          >
            +
          </AddButton>
        </AddButtonWrapper>
      </WebSize>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  justify-content: center;
  background-color: black;
`;

const WebSize = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 100vh;
  background-color: #e2f2d5;
  width: 390px;
`;

const RoutineName = styled.div`
  margin-top: 50px;
`;

const RoutineBox = styled.div`
  box-shadow: 3px 3px 3px 3px gray;
  width: 328px;
  min-height: ${(props) =>
    props.foldValue ? '200px' : '60px'}; // fold 값에 따라 동적으로 높이 설정
  border-radius: 20px;
  padding: 20px;
  background-color: ${(props) =>
    props.routineBoxColor ? '#F5FDEE' : '#C5D0BC'};
  /* background-color: #F5FDEE; */
  user-select: none;
  transition: 0.5s;
  border: 1px solid gray;
  margin: 30px 0;
  position: relative;
`;
const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const Tag = styled.div`
  color: #64705b;
  font-size: 12px;
  font-weight: bold;
`;

const Toggle = styled.div`
  width: 55px;
  height: 30px;
  background-color: ${(props) => (props.toggleColor ? '#34C759' : '#64705B')};
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 1px;
`;

const ToggleCircle = styled.div`
  width: 25px;
  height: 26px;
  border-radius: 50px;
  background-color: white;
  transform: ${(props) => (props.toggleOnOff ? `translateX(27px)` : '')};
  transition: 0.2s;
`;

const TitleAndToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 338px;
  margin-bottom: 20px;
  /* border: 1px solid red; */
`;

const AddButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: none;
  font-size: 32px;
  font-weight: lighter;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const Tags = styled.p`
  color: #64705b;
  font-size: 12px;
`;

const RoutineBoxWrapper = styled.div`
  /* border: 1px solid red; */
  overflow-y: auto;
  margin: 20px 0;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const ActiveRemove = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
  font-size: 12px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  position: absolute;
  right: 0px;
  top: -10px;
  border-radius: 30px;
  padding: 2px 5px;
  border: 1px solid gray;
  cursor: pointer;
`;
