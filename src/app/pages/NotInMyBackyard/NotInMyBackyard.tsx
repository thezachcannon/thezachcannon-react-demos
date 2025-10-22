'use client';
import { startTransition, useEffect, useMemo, useState } from "react";
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

export const NotInMyBackyard = () => {
    const piecesOfTrash = useMemo<TrashType[]>(() => Array.from({ length: 10 }, (_, i) => randomTrashType()), []);
    const [piecesOfTrashLookup, setPiecesOfTrashLookup] = useState<Record<number, TrashItem>>(piecesOfTrash.reduce((acc, _: string, index: number): Record<number, TrashItem> => {
        acc[index] = { hasPickedUp: false, shouldShow: false };
        return acc;
    }, {} as Record<number, TrashItem>))
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
    useEffect(() => {
        const trashLeft = Object.values(piecesOfTrashLookup).some(x => x.hasPickedUp === false);
        if (!trashLeft) return;
        const interval = setInterval(() => {
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
        }, 100)

        return () => clearInterval && clearInterval(interval);
    }, [piecesOfTrashLookup]);

    const currentScore = Object.values(piecesOfTrashLookup).filter(t => t.hasPickedUp).length;

    if(!trashLeft) return <div>Game Over - Score {currentScore}</div>
    return <>
        <div>{currentScore}</div>
        <div style={{ minHeight: "320px" }} className="grid grid-cols-10 justify-items-center">
            {piecesOfTrash.map((_, x) => <div style={{ height: "32px", width: "32px" }} key={x}>{!piecesOfTrashLookup[x].hasPickedUp && piecesOfTrashLookup[x].shouldShow && <div className="cursor-pointer hover:bg-slate-300"><PieceOfTrash onClick={() => handleClick(x)} trashType={_} number={x} /></div>}</div>)}
        </div>
    </>;
}