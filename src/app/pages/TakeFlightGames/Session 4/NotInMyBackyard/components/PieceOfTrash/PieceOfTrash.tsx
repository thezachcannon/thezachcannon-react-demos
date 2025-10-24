import Dinosaur from "./Trash";

export const DinosaurEgg = ({ number, dinosaurType, onClick }: { number: number, onClick?: () => void, dinosaurType: string }) => {
    return (
        <div 
            onClick={onClick} 
            className="transform hover:scale-110 transition-transform duration-200 animate-pulse"
        >
            <Dinosaur type={dinosaurType} size={32}/>
        </div>
    );
}