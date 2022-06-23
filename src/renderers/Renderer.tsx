import {lazy, FC, Suspense, useEffect, useState, ReactNode} from 'react';
import {IDetailItem} from '../misc/interfaces';

export interface RenderProps {
    item: IDetailItem;
    loading: ReactNode;
}

const importRenderer = (name: string) =>
    lazy<FC<RenderProps>>(() =>
        import(`./${name.charAt(0).toUpperCase() + name.slice(1)}Renderer`)
            .catch(_ => import('./DefaultRenderer')));

export default function Renderer({name, item, loading}: { name: string } & RenderProps) {
    const [rendererElem, setRendererElem] = useState<ReactNode>(null);

    useEffect(() => {
        const RenderElement = importRenderer(name);
        setRendererElem(<RenderElement item={item} loading={loading}/>);
    }, [name]);

    return (
        <Suspense fallback={loading}>
            {rendererElem}
        </Suspense>
    );
}
