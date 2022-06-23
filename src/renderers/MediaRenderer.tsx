import {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper';
import {Swiper as SwiperClass} from 'swiper/types';

import {RenderProps} from './Renderer';
import {getServiceServer} from '../misc/config';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './MediaRenderer.css';
import {IDetailItem} from '../misc/interfaces';

interface UrlInfo {
    url: string;
    ok: boolean;
    content_type: string | null;
}

const getUrls = (item: IDetailItem): string[] => item.values
    .filter(field => field.link?.dataset === 'extern')
    .map(field => field.value);

const allowContentType = (contentType: string) =>
    contentType.startsWith('image/') || contentType.startsWith('audio/') || contentType.startsWith('video/');

export default function MediaRenderer({item, loading}: RenderProps) {
    const [urlsInfo, setUrlsInfo] = useState<UrlInfo[]>([]);
    const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

    useEffect(() => {
        getUrlsInfo(getUrls(item)).then(setUrlsInfo);
    }, [item]);

    if (getUrls(item).length !== urlsInfo.length)
        return loading;

    return (
        <Swiper
            slidesPerView={'auto'}
            spaceBetween={10}
            centeredSlides={true}
            navigation={true}
            pagination={{clickable: true}}
            modules={[Navigation, Pagination]}
            onSwiper={setSwiperRef}
            className="hcMarginBottom1"
        >
            {urlsInfo.filter(info => info.ok && info.content_type && allowContentType(info.content_type)).map(info =>
                <SwiperSlide key={info.url}>
                    {info.content_type?.startsWith('image/') &&
                        <img src={info.url} className="slide-box"/>}
                    {info.content_type?.startsWith('audio/') &&
                        <audio controls onLoadedMetadata={_ => swiperRef?.updateSlides()}>
                            <source src={info.url} type={info.content_type}/>
                            Your browser does not support the audio tag.
                        </audio>}
                    {info.content_type?.startsWith('video/') &&
                        <video controls onLoadedMetadata={_ => swiperRef?.updateSlides()} className="slide-box">
                            <source src={info.url} type={info.content_type}/>
                            Your browser does not support the video tag.
                        </video>}
                </SwiperSlide>
            )}
        </Swiper>
    );
}

async function getUrlsInfo(urls: string[]): Promise<UrlInfo[]> {
    return Promise.all(urls.map(async url => {
        try {
            const result = await fetch(`${getServiceServer()}typeinfo?url=${encodeURIComponent(url)}`);
            if (result.ok)
                return result.json();
            return {url, ok: false, content_type: null};
        }
        catch (e) {
            return {url, ok: false, content_type: null};
        }
    }));
}
