'use client';

import axios from 'axios';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import DaySelectAndWeekDaySelect from './DaySelectAndWeekDaySelect';

interface RoutineAddProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RoutineAdd({ setModal }: RoutineAddProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('count');
  const [tag, setTag] = useState<boolean[]>([]);
  const [selectWeek, setSelectWeek] = useState<string>('매일');
  // const [selectWeek, setSelectWeek] = useState<boolean[]>([])
  const [view, setView] = useState<boolean>(false);
  const [goalView, setGoalView] = useState<boolean>(false);
  const [sortationView, setSortationView] = useState<boolean>(false);
  const [choice, setChoice] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [time, setTime] = useState<boolean>(false);
  const [addTimeCount, setAddTimeCount] = useState<number>(0);

  const weekArr = ['매일', '평일', '주말'];
  const weekDay = ['월', '화', '수', '목', '금', '토', '일'];

  const sortationArr = ['count', 'percent', 'checkbox'];

  const tagRef = useRef();

  const DateValue = '1979. 12. 12';

  const handleSelectDay = (e: any, i: number) => {
    if (e === '평일') {
      setChoice([true, true, true, true, true, false, false]);
    } else if (e === '주말') {
      setChoice([false, false, false, false, false, true, true]);
    } else if (e === '매일') {
      setChoice(Array(7).fill(true));
    } else if (e === '매주') {
      let arr = [...choice];
      arr[i] = !arr[i];
      if (
        arr.every(
          (value, index) =>
            value === [true, true, true, true, true, false, false][index]
        )
      ) {
        e = '평일';
      } else if (
        arr.every(
          (value, index) =>
            value === [false, false, false, false, false, true, true][index]
        )
      ) {
        e = '주말';
      } else if (
        arr.every(
          (value, index) =>
            value === [true, true, true, true, true, true, true][index]
        )
      ) {
        e = '매일';
      }
      setChoice(arr);
    }
    setSelectWeek(e);
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event: any) => {
    setType(event.target.value);
  };

  let tagValue = '';
  const handleTagChange = (event: any) => {
    if (event.keyCode === 13 && tagValue !== '') {
      setTag([...tag, tagValue]);
      tagRef.current.value = '';
    } else {
      tagValue = event.target.value;
    }
  };

  const DataValue = {
    name: name,
    type: type,
    datetime: {
      monday: {
        start: '09:00',
        end: '18:00',
      },
    },
    isActived: true,
    routineTags: tag,
    activedAt: new Date().toISOString(),
    inactivedAt: new Date().toISOString(),
  };

  async function postRoutine(data) {
    try {
      const response = await axios.post(
        'https://dev.lifelog.devtkim.com/routine',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // console.log(response);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Body>
      <Title>루틴 추가</Title>
      <InputContents>
        <InputContentsExceptSaveButton>
          <List>
            <ListTitle>이름</ListTitle>
            <InputSpace
              placeholder='15자 이하'
              onChange={(e) => handleNameChange(e)}
            />
          </List>
          <List2>
            <SortationWrapper>
              <SortationTitleWrapper>
                <ListTitle>구분</ListTitle>
                <CheckboxWrapper onClick={() => setGoalView(!goalView)}>
                  <CheckboxInput type='checkbox' />
                  <CheckboxText>목표설정</CheckboxText>
                </CheckboxWrapper>
              </SortationTitleWrapper>
              <SortationChoice onClick={() => setSortationView(!sortationView)}>
                {type}
                <LowIcon>▼</LowIcon>
              </SortationChoice>
              {sortationView ? (
                <SortationList>
                  {sortationArr.map((e, i) => {
                    return <Sortation key={i}>{e}</Sortation>;
                  })}
                </SortationList>
              ) : (
                ''
              )}
              {/* <InputSpace onChange={(e) => handleTypeChange(e)}/> */}
            </SortationWrapper>
          </List2>
          {goalView ? (
            <List2>
              <ListTitle2>목표</ListTitle2>
              <InputSpace
                placeholder='숫자만 입력 가능합니다 (0 ~ 9999)'
                onChange={(e) => handleTypeChange(e)}
              />
            </List2>
          ) : (
            ''
          )}
          <List2>
            <ListTitle2>태그</ListTitle2>
            <InputSpace
              placeholder='비워두면 루틴 이름으로 설정됩니다'
              ref={tagRef}
              onKeyDown={(e) => handleTagChange(e)}
            />
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
            <WhenStartAndDateWrapper>
              <WhenStart>언제까지 할까요?</WhenStart>
              <DateSelect>2023.03.10</DateSelect>
            </WhenStartAndDateWrapper>
            {/* <DaySelectAndWeekDaySelect
                view={view}
                setView={setView}
                selectWeek={selectWeek}
                setSelectWeek={setSelectWeek}
                choice={choice}
                setChoice={setChoice}
                time={time}
                setTime={setTime}
            /> */}
            <DaySelectAndWeekDaySelectWrapper>
              <DaySelectWrapper>
                <DaySelect onClick={() => setView(!view)}>
                  {selectWeek}
                  <LowIcon>▼</LowIcon>
                </DaySelect>
                {view ? (
                  <WeekList>
                    {weekArr.map((e, i) => {
                      return (
                        <WeekKind
                          key={i}
                          onClick={() => {
                            handleSelectDay(e, null);
                            setView(!view);
                          }}
                        >
                          {e}
                        </WeekKind>
                      );
                    })}
                  </WeekList>
                ) : null}
                <CheckBoxAndText>
                  <CheckHoliday type='checkbox' />
                  <HolidayText>공휴일 제외</HolidayText>
                </CheckBoxAndText>
              </DaySelectWrapper>
              <WeekDaySelectWrapper>
                <Week>
                  {weekDay.map((e, i) => {
                    return (
                      <Day
                        key={i}
                        choice={choice[i]}
                        onClick={() => handleSelectDay('매주', i)}
                      >
                        {' '}
                        {e}
                      </Day>
                    );
                  })}
                </Week>
                <Time onClick={() => setTime(!time)}>+ 시간</Time>
              </WeekDaySelectWrapper>
            </DaySelectAndWeekDaySelectWrapper>

            {/* <DaySelectAndWeekDaySelect/> */}
            {time ? (
              <TimeChoiceWrapper>
                <TimeChoice>오전 9시</TimeChoice>
                <TimeChoice>오후 6시</TimeChoice>
              </TimeChoiceWrapper>
            ) : (
              ''
            )}
          </SelectDateWrapper>
          {Array.from({ length: addTimeCount }, (_, i) => (
            <DaySelectAndWeekDaySelect
              key={i}
              view={view}
              setView={setView}
              selectWeek={selectWeek}
              setSelectWeek={setSelectWeek}
              choice={choice}
              setChoice={setChoice}
              time={time}
              setTime={setTime}
            />
          ))}
          <DateAndTimeAdd onClick={() => setAddTimeCount(addTimeCount + 1)}>
            + 날짜 및 시간 추가
          </DateAndTimeAdd>
        </InputContentsExceptSaveButton>
        <ConfirmAndCancle>
          <Cancel onClick={() => setModal(false)}>취소</Cancel>
          <Confirm
            onClick={() => {
              // console.log(DataValue)
              postRoutine(DataValue);
              // console.log(name, type, tag, DateValue)
            }}
          >
            저장
          </Confirm>
        </ConfirmAndCancle>
      </InputContents>
    </Body>
  );
}

const Body = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  z-index: 1;
  border-radius: 50px 50px 0 0;
`;

const InputContents = styled.div`
  padding: 20px 40px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  margin: 20px 0;
`;
const List2 = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  margin: 20px 0;
`;
const ListTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 18px;
`;
const ListTitle2 = styled.p`
  min-width: 45px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid black;
  padding: 0 10px 10px 0;
`;

const TagList = styled.div``;
const InputSpace = styled.input`
  border: none;
  border-bottom: 1px solid black;
  padding: 0 10px 10px 0;
  width: 100%;
`;
const ConfirmAndCancle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Confirm = styled.button`
  padding: 7px 45px;
  margin-right: 20px;
  border-radius: 10px;
  color: white;
  background-color: #64705b;
  border: none;
  cursor: pointer;
`;
const Cancel = styled.button`
  color: #64705b;
  background-color: white;
  cursor: pointer;
  padding: 7px 45px;
  margin-left: 20px;
  border-radius: 10px;
  border: 1px solid;
`;
const Category = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 30px 0;
`;
const SelectDateWrapper = styled.div`
  width: 100%;
`;

const WhenStartAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DateSelect = styled.div`
  background-color: #f6f6f6;
  border-radius: 20px;
  padding: 5px 10px;
`;
const WhenStart = styled.div`
  color: #64705b;
  font-size: 14px;
  font-weight: bold;
`;
const DaySelectWrapper = styled.div`
  margin-top: 10px;
  background-color: #f6f6f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  user-select: none;
  position: relative;
`;
const DaySelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 170px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 8px;
  cursor: pointer;
`;

const CheckBoxAndText = styled.div`
  visibility: hidden;
  display: flex;
  align-items: center;
  user-select: none;
`;

const CheckHoliday = styled.input`
  cursor: pointer;
`;
const HolidayText = styled.p`
  font-size: 14px;
  margin-left: 5px;
`;

const WeekList = styled.div`
  position: absolute;
  top: 50px;
`;

const WeekKind = styled.div`
  background-color: white;
  width: 170px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border: 1px solid gray;
`;

const LowIcon = styled.span`
  /* position: absolute;
    margin-left: 135px; */
  font-size: 12px;
`;

const WeekDaySelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f6f6;
  padding: 10px 15px;
`;
const Week = styled.div`
  width: 220px;
  display: flex;
  justify-content: space-between;
`;

const Day = styled.span`
  border: ${(props) => (props.choice ? 'black' : 'F6F6F6')} solid 1px;
  padding: 2px 4px;
  border-radius: 20px;
  user-select: none;
  cursor: pointer;
`;

const Time = styled.button`
  border-radius: 20px;
  border: none;
  background-color: black;
  color: white;
  font-weight: bold;
  padding: 5px;
  cursor: pointer;
`;

const TimeChoice = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  border-bottom: 1px solid gray;
  padding-bottom: 5px;
  margin: 10px 0;
`;

const TimeChoiceWrapper = styled.div`
  background-color: #f6f6f6;
  padding: 10px 15px;
`;

const SortationChoice = styled.div`
  border: 1px solid black;
  padding: 8px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const SortationWrapper = styled.div`
  width: 100%;
`;

const SortationTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 18px;
`;

const CheckboxText = styled.div`
  margin-left: 5px;
`;
const CheckboxInput = styled.input`
  cursor: pointer;
`;

const SortationList = styled.div``;
const Sortation = styled.div``;

const DateAndTimeAdd = styled.div`
  color: #64705b;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  cursor: pointer;
`;

const DaySelectAndWeekDaySelectWrapper = styled.div``;
const InputContentsExceptSaveButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 40px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
