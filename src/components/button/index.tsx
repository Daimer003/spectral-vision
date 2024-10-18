
interface PropsButton {
    children: any,
    onClick: () => void
}

const ButtonPrimary = ({children, onClick}: PropsButton) => {
    return ( 
        <button onClick={onClick} className="buttonscan">
            {children}
        </button>
     );
}
 
export default ButtonPrimary;