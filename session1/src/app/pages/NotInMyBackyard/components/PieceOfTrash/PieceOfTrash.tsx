import Trash from "./Trash";

export const PieceOfTrash = ({ number, trashType, onClick }: { number: number, onClick?: () => void, trashType: string }) => {
    const handleClick = () => {
        // Add collection animation
        const element = document.getElementById(`trash-${number}`);
        if (element) {
            element.classList.add('trash-collected');
            setTimeout(() => {
                onClick?.();
            }, 300);
        } else {
            onClick?.();
        }
    };

    return (
        <div 
            id={`trash-${number}`}
            onClick={handleClick}
            className="relative group"
        >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-300 scale-110"></div>
            
            {/* Trash item */}
            <div className="relative z-10 transform transition-transform duration-200 group-hover:scale-110">
                <Trash type={trashType} fill="#00e676" stroke="#1b5e20" size={36}/>
            </div>
            
            {/* Sparkle effect */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </div>
    );
}