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