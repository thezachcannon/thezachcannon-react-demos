'use client';
import { startTransition, useEffect, useMemo, useState, useEffectEvent } from "react";
import { PieceOfTrash } from "./components/PieceOfTrash/PieceOfTrash";
import { TrashType } from "./components/PieceOfTrash/Trash";

type TrashItem = {
    hasPickedUp: boolean;
    shouldShow: boolean;
}
const randomTrashType = () => {
    const types = Object.values(TrashType);
    return types[Math.floor(Math.random() * types.length)];
}

const TIME_LIMIT = 41
export const NotInMyBackyard = () => {
    const [gameStarting, setGameStarting] = useState(false)
    const piecesOfTrash = useMemo<TrashType[]>(() => Array.from({ length: 100 }, (_, i) => randomTrashType()), []);
    const [piecesOfTrashLookup, setPiecesOfTrashLookup] = useState<Record<number, TrashItem>>(piecesOfTrash.reduce((acc, _: string, index: number): Record<number, TrashItem> => {
        acc[index] = { hasPickedUp: false, shouldShow: false };
        return acc;
    }, {} as Record<number, TrashItem>))
    const [timeIsUp, setTimeIsUp] = useState(false)
    const [timerTime, setTimerTime] = useState(0)
    const trashLeft = Object.values(piecesOfTrashLookup).some(x => x.hasPickedUp === false);

    const handleClick = (index: number) => {
        startTransition(() => {
            setPiecesOfTrashLookup(s => {
                const newState = { ...s };
                newState[index].hasPickedUp = true;
                return newState;
            })
        })
    }

    function getTrashStatusIndexes(piecesOfTrashLookup: Record<number, TrashItem>): [number[], number[]] {
        return Object.values(piecesOfTrashLookup).reduce((acc, item, index) => {
            if (item.shouldShow) {
                acc[0].push(index);
            } else {
                acc[1].push(index);
            }
            return acc;
        }, [[], []] as [number[], number[]]);
    }

    const onUpdatePieces = useEffectEvent(() => {
        const trashLeft = Object.values(piecesOfTrashLookup).some(x => x.hasPickedUp === false);
        if (!trashLeft) return;
        const [shownTrashIndexes, hiddenTrashIndexes] = getTrashStatusIndexes(piecesOfTrashLookup);
        setPiecesOfTrashLookup(s => {
            const newState = { ...s };
            if (Math.random() < 0.8 && hiddenTrashIndexes.length > 0) {
                const randomIndex = hiddenTrashIndexes[Math.floor(Math.random() * hiddenTrashIndexes.length)];
                newState[randomIndex].shouldShow = true;
            }
            //20 percent chance to hide a shown trash piece
            if (Math.random() < 0.2 && shownTrashIndexes.length > 0) {
                const randomShownIndex = shownTrashIndexes[Math.floor(Math.random() * shownTrashIndexes.length)]
                newState[randomShownIndex].shouldShow = false;
            }
            return newState;
        })
    })

    const onUpdateTime = useEffectEvent(() => {
        if(timerTime < TIME_LIMIT) setTimerTime(s => s + 1)
    })

    useEffect(() => {
        if(!gameStarting) return;
        const timeout = setTimeout(() => {
            setTimeIsUp(true)
        }, TIME_LIMIT * 1000)
        return () => timeout && clearTimeout(timeout)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            onUpdatePieces()
        }, 100)

        const timeInterval = setInterval(() => {
            onUpdateTime()
        }, 1000)

        return () => {
            interval && clearInterval(interval)
            timeInterval && clearInterval(timeInterval)
        }
    }, []);
    
    const currentScore = Object.values(piecesOfTrashLookup).filter(t => t.hasPickedUp).length;
    if(!gameStarting) return <div><button onClick={() => setGameStarting(true)}>Start Game</button></div>
    if (!trashLeft || TIME_LIMIT - timerTime == 0) return <div>Game Over - Score {currentScore}</div>
    return <>
        <div>{TIME_LIMIT - timerTime}</div>
        <div>{currentScore}</div>
        <div style={{ minHeight: "320px" }} className="grid grid-cols-10 justify-items-center">
            {piecesOfTrash.map((_, x) => <div style={{ height: "32px", width: "32px" }} key={x}>{!piecesOfTrashLookup[x].hasPickedUp && piecesOfTrashLookup[x].shouldShow && <div className="cursor-pointer hover:bg-slate-300"><PieceOfTrash onClick={() => handleClick(x)} trashType={_} number={x} /></div>}</div>)}
        </div>
    </>;
}