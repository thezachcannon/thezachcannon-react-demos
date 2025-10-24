import Trash from "./Trash";

export const PieceOfTrash = ({ number, trashType, onClick }: { number: number, onClick?: () => void, trashType: string }) => {
    return (
        <div 
            onClick={onClick}
            className="hover:animate-pulse"
        >
            <Trash type={trashType} size={32}/>
        </div>
    );
}