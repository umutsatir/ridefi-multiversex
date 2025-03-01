import { AuthRedirectWrapper } from "wrappers";
import { useScrollToElement } from "hooks";

export const Search = () => {
    useScrollToElement();

    return (
        <AuthRedirectWrapper>
            <div className="flex flex-col w-full h-[calc(100vh-200px)] justify-center items-center">
                <div className="flex flex-col w-11/12 p-6 items-center justify-center gap-2 rounded-xl bg-[#f6f8fa]">
                    <h1 className="text-4xl font-bold">Search</h1>
                </div>
            </div>
        </AuthRedirectWrapper>
    );
};
