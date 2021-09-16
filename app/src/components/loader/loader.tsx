type LoaderProps = {
    title: string;
}

const Loader: React.FC<LoaderProps> = ({ title }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700 mb-4"></div>
            {title && <p className="block w-full font-semibold text-center">{title}</p>}
        </div>  
    );
}
export default Loader;