import Trash from "./Trash";

export const PieceOfTrash = ({ number, trashType, onClick }: { number: number, onClick?: () => void, trashType: string }) => {
    return <div onClick={onClick}><Trash type={trashType} fill="#00e676" stroke="#1b5e20" size={32}/></div>;
}