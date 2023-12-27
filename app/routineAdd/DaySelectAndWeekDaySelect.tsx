import styled from 'styled-components';

export default function DaySelectAndWeekDaySelect({
  view,
  setView,
  selectWeek,
  setSelectWeek,
  choice,
  setChoice,
  time,
  setTime,
}) {
  const weekArr = ['매일', '평일', '주말'];
  const weekDay = ['월', '화', '수', '목', '금', '토', '일'];

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

  return (
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
                    // handleSelectDay(e, null);
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
                // choice={choice[i]}
                onClick={() => handleSelectDay('매주', i)}
              >
                {' '}
                {e}
              </Day>
            );
          })}
        </Week>
        {/* <Time onClick={() => setTime(!time)}>+ 시간</Time> */}
      </WeekDaySelectWrapper>
    </DaySelectAndWeekDaySelectWrapper>
  );
}

const LowIcon = styled.span`
  /* position: absolute;
    margin-left: 135px; */
  font-size: 12px;
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
  /* border: ${(props) => (props.choice ? 'black' : 'F6F6F6')} solid 1px; */
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
const DaySelectAndWeekDaySelectWrapper = styled.div`
  width: 100%;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
