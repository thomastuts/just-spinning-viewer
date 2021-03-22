import axios from "axios";

const ebsClient = axios.create({
  baseURL: process.env.REACT_APP_EBS_API_ENDPOINT,
});

export const getChannel = (channelName) => {
  return ebsClient.get("/channel", { params: { channel_name: channelName } });
};

export const getQueue = (channelId) => {
  return ebsClient.get(`/${channelId}/queue`);
};

export const getActivePrize = (channelId) => {
  return ebsClient.get(`/${channelId}/active-prize`);
};

export const startPrize = (channelId, prizeId) => {
  return ebsClient.post(`/${channelId}/prizes/${prizeId}/start`);
};

export const fulfillPrize = (channelId, prizeId) => {
  return ebsClient.post(`/${channelId}/prizes/${prizeId}/fulfill`);
};
