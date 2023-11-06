import styles from './page.module.css'

export default function Routine() {
    return (
        <div className={styles.main}>
            <div className={styles.routineBox}>
                <div className={styles.routineBoxTitle}>커피</div>
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
                {/* <div className={styles.routineBoxContent}>반복</div>
                <div className={styles.routineBoxContent}>활성</div> */}
            </div>
        </div>
    )
}