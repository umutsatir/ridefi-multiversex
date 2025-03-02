export type WidgetProps = {
    callbackRoute: string;
};

export type WidgetType<T = any> = {
    title: string;
    widget: (props: T) => JSX.Element;
    description?: string;
    reference: string;
    anchor?: string;
    metadata?: any;
    imageUrl?: string;
};
