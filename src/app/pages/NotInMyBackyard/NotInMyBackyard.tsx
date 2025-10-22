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
    const piecesOfTrash = useMemo<TrashType[]>(() => Array.from({ length: 100 }, (_, i) => randomTrashType()), []);
    const [piecesOfTrashLookup, setPiecesOfTrashLookup] = useState<Record<number, TrashItem>>(piecesOfTrash.reduce((acc, _: string, index: number): Record<number, TrashItem> => {
        acc[index] = { hasPickedUp: false, shouldShow: false };
        return acc;
    }, {} as Record<number, TrashItem>))

    const handleClick = (index: number) => {
        startTransition(() => {
            setPiecesOfTrashLookup(s => {
                const newState = { ...s };
                newState[index].hasPickedUp = true;
                return newState;
            })
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            startTransition(() => {
                setPiecesOfTrashLookup(s => {
                    const newState = { ...s };
                    const hiddenTrashIndexes = Object.entries(newState).filter(([_, v]) => !v.shouldShow).map(([k, _]) => Number(k));
                    if (hiddenTrashIndexes.length === 0) {
                        return newState;
                    }
                    const randomIndex = hiddenTrashIndexes[Math.floor(Math.random() * hiddenTrashIndexes.length)];
                    newState[randomIndex].shouldShow = true;
                    return newState;
                })
            })
        }, 100)

        return () => clearInterval(interval);
    }, [])

    const currentScore = Object.values(piecesOfTrashLookup).filter(t => t.hasPickedUp).length;

    return <>
        <div>{currentScore}</div>
        <div style={{ minHeight: "320px" }} className="grid grid-cols-10 justify-items-center">
            {piecesOfTrash.map((_, x) => <div style={{ height: "32px", width: "32px" }} key={x}>{!piecesOfTrashLookup[x].hasPickedUp && piecesOfTrashLookup[x].shouldShow && <div className="cursor-pointer hover:bg-slate-300"><PieceOfTrash onClick={() => handleClick(x)} trashType={_} number={x} /></div>}</div>)}
        </div>
    </>;
}