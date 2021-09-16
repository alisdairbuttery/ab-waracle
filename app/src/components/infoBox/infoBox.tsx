type Props = {
    title: string;
}

const InfoBox: React.FC<Props> = ({ title, children }) => {
    return (
        <div className="bg-teal-100 border-t-4 border-blue-500 rounded-b text-black-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex">
            <div>
                {title && <p className="font-bold mb-2">{title}</p>}
                {children}
            </div>
        </div>
    </div>
    );
}

export default InfoBox;