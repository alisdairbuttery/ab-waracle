import { Link } from '@reach/router';

// Constants
import { ROUTES } from '../../constants';

const Header = () => {
    return (
        <header className="w-full px-4 py-6 bg-green-300 z-20">
            <div className="container mx-auto flex items-center justify-between flex-wrap ">
                <div className="flex items-center flex-no-shrink text-black mr-6">
                    <p className="font-semibold text-4xl tracking-tight mb-0 mt-0" data-testid="logo">Cat.ly <span className="text-sm">by Alisdair Buttery</span></p>
                </div>

                <div className="justify-self-end">
                    <div className="text-md">
                        <Link to={ROUTES.HOME} className="mr-6 font-bold hover:underline">Home</Link>
                        <Link to={ROUTES.UPLOAD} className="mr-6 hover:underline">Upload</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;