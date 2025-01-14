import { engine_get_destinations_endpoint, engine_get_hotels_endpoint, engine_get_omras_endpoint, engine_get_vols_endpoint } from '@/app/Constant/urls';

export function getDestinationEngineUrl(index) {
    switch (index) {
        case 1:
            return engine_get_vols_endpoint;
        case 2:
            return engine_get_destinations_endpoint;
        case 3:
            return engine_get_hotels_endpoint;
        case 4:
            return engine_get_omras_endpoint;
        default:
            return engine_get_vols_endpoint;
    }
}

export function getScreenElementSize() {
    if (window.innerWidth < 768) {
        return 1;
    } else if (window.innerWidth < 1024) {
        return 2;
    } else if (window.innerWidth < 1280 && window.innerWidth > 1024) {
        return 3;
    } else {
        return 4;
    }
}