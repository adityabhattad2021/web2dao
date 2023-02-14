function CustomButton({
    buttonType,
    title,
    styles,
    handleClick
}){
    return(
        <button
            type={buttonType}
            className={`font-epilogue font-semibold pt-[10px] text-[28px] leading-[16px] text-white min-h-[52px] px-4 rounded-xl ${styles}`}
            onClick={handleClick}
        >
            {title}
        </button>
    )
}


export default CustomButton;