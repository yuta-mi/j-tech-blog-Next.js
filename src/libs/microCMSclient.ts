import appConfig from '@/config/appConfig';
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: appConfig.api.microCMS.domain, 
  apiKey: appConfig.api.microCMS.apiKey,
});