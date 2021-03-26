import axios from "axios";

const ebsClient = axios.create({
  baseURL: process.env.REACT_APP_EBS_API_ENDPOINT,
});

export const getChannel = (channelId) => {
  return ebsClient.get(`/viewer/channels/${channelId}`);
};

export const getActivePrize = (channelId) => {
  return ebsClient.get(`/viewer/channels/${channelId}/active-prize`);
};
