import type { PropsWithChildren } from "react";
import classNames from "classnames";
import { Loader } from "components/sdkDappComponents";
import { WithClassnameType } from "types";

interface OutputContainerPropsType
    extends PropsWithChildren,
        WithClassnameType {
    isLoading?: boolean;
}

export const OutputContainer = (props: any) => {
    const { children, isLoading = false, className = "p-4" } = props;

    return (
        <div className="flex justify-between items-center gap-4">
            <img src={props.imageurl} className="w-[200px] h-[140px]" alt="" />
            <div
                className={classNames(
                    "text-sm border border-gray-200 rounded w-1/2",
                    className
                )}
                data-testid={props["data-testid"]}
            >
                {isLoading ? <Loader /> : children}
            </div>
        </div>
    );
};
