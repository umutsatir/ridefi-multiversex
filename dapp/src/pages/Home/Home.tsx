import { MxLink } from "components";
import { RouteNamesEnum } from "localConstants";
import { AuthRedirectWrapper, PageWrapper } from "wrappers";

export const Home = () => {
    return (
        <AuthRedirectWrapper requireAuth={false}>
            <div className="flex justify-around items-center w-9/12 h-10/12 max-w-8xl">
                <div className="text-center w-auto max-w-3xl">
                    <h1 className="text-7xl font-bold text-blue-500 ">
                        RideFi
                    </h1>
                    <p className="m-[30px]">
                        The future of car ownership is here. Discover cars
                        available for sale and rent on the blockchain. Use the
                        power of blockchain technology to benefit from a secure,
                        transparent, and efficient way to buy and sell cars.
                    </p>
                    <MxLink to={RouteNamesEnum.dashboard}>Discover Cars</MxLink>
                </div>

                <div>
                    <img
                        src="../../../car.jpg"
                        alt="PHOTO"
                        className="rounded-[20px]"
                    />
                </div>
            </div>
        </AuthRedirectWrapper>
    );
};
