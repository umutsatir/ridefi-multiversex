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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reiciendis consequatur consequuntur facilis iure esse?
                        Quos tenetur ipsam laudantium exercitationem quibusdam
                        adipisci aspernatur. Exercitationem molestiae, porro
                        totam placeat impedit maxime harum.
                    </p>
                    <MxLink to={RouteNamesEnum.dashboard}>Discover Car</MxLink>
                </div>

                <div>
                    <img
                        src="https://picsum.photos/500/300"
                        alt="PHOTO"
                        className="rounded-[20px]"
                    />
                </div>
            </div>
        </AuthRedirectWrapper>
    );
};
