import { AuthRedirectWrapper } from "wrappers";
import { useScrollToElement } from "hooks";

export const Details = () => {
    useScrollToElement();

    return (
        <AuthRedirectWrapper>
            <div className="flex flex-col w-full h-[calc(100vh-200px)] justify-center items-center">
                <div className="flex flex-col w-11/12 p-6 items-center justify-center gap-2 rounded-xl bg-[#f6f8fa]">
                    <h4 className="mt-3 text-xl">Details</h4>
                    <img src="https://picsum.photos/1000/500" alt="" />
                    <div>
                        <h1>Volkswagen Golf</h1>
                        <p>Less used car</p>
                        <h1>2012</h1>
                    </div>
                </div>
            </div>
        </AuthRedirectWrapper>
    );
};
