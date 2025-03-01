import { Card } from "components/Card";
import { getCallbackRoute } from "utils/getCallbackRoute";
import { WidgetType } from "types/widget.types";
import { useIsWebProvider } from "hooks";

export const Widget = ({
    title,
    description,
    reference,
    anchor,
    widget: MxWidget,
    props = {},
}: WidgetType) => {
    const { isWebProvider } = useIsWebProvider();
    const callbackRoute = anchor
        ? getCallbackRoute({ anchor, isWebProvider })
        : "";

    return (
        <div className="max-w-sm w-full max-h-96">
            <Card
                title={title}
                description={description}
                reference={reference}
                anchor={anchor}
            >
                <MxWidget callbackRoute={callbackRoute} {...props} />
            </Card>
        </div>
    );
};
