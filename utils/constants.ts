const API_URL = "http://10.0.0.179:5000";

const API_VERSION = "v1";

export const API_ENDPOINT = `${API_URL}/api/${API_VERSION}`;
export const ZONE_UPLOAD_URL = `${API_URL}`;
export const PROFILE_UPLOAD_URL = `${API_URL}/static/profile`;

export const GET_ZONES_URL = `${API_ENDPOINT}/web/zones/all`;
export const ZONES_URL = `${API_ENDPOINT}/zones/`;

export const USERS_URL = `${API_ENDPOINT}/users/list`;
export const UPDATE_USERS_URL = `${API_ENDPOINT}/users/edit`;
export const DELETE_USERS_URL = `${API_ENDPOINT}/users/remove`;
export const ADD_USERS_URL = `${API_ENDPOINT}/users/add`;

export const CATEGORY_URL = `${API_ENDPOINT}/category`;

export const COMMENTS_URL = `${API_ENDPOINT}/comments`;
export const DEVICES_URL = `${API_ENDPOINT}/devices`;
export const PREDICTION_URL = `${API_ENDPOINT}/predictions`;



export const TOTAL_USERS_COUNT_URL = `${API_ENDPOINT}/detail/count/users`;
export const TOTAL_ADMIN_COUNT_URL = `${API_ENDPOINT}/detail/count/admin`;
export const TOTAL_STAFF_COUNT_URL = `${API_ENDPOINT}/detail/count/staff`;
export const TOTAL_SECTION_COUNT_URL = `${API_ENDPOINT}/detail/count/section`;


export const TODAY_COUNT_URL = `${API_ENDPOINT}/visitors/count/today`;
export const LASTDAY_COUNT_URL = `${API_ENDPOINT}/visitors/count/last-day`;
export const LASTWEEK_COUNT_URL = `${API_ENDPOINT}/visitors/count/last-week`;
export const LASTMONTH_COUNT_URL = `${API_ENDPOINT}/visitors/count/last-month`;



export const SECTION_UTILIZATION_URL = `${API_ENDPOINT}/section/utilization`;
export const SECTION_VS_SECTION_UTILIZATION_URL = `${API_ENDPOINT}/section/utilization/sections/percentage`;



export const AUTHORIZATION_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJramduYXF1aW5lcyIsInZlcmlmaWVkIjp0cnVlLCJpc19zdXBlcnVzZXIiOnRydWUsImV4cCI6MTcyOTQ2MzQ0OX0.Ry0Omn5sizDC1ItMSdXwONjaErev7yu2JHU177sX3kI';


