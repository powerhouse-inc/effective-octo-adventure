interface TagProps {
  text: string;
  variant?: "gray" | "green";
  className?: string;
}

const TagStatus = ({ text, variant = "gray", className = "" }: TagProps) => {
  const baseClasses = " px-[10px] py-[2px] rounded-[4px] border  w-fit";

  const variantClasses = {
    gray: "text-sm bg-gray-200 text-gray-900 border-[#FFFFFF00] font-semibold",
    green:
      "text-sm bg-green-50 text-[#34A853] border-[#FFFFFF00] font-semibold",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {text}
    </div>
  );
};

export default TagStatus;
