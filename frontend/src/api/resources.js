import api from "./axios";

// 리소스 목록 조회
export const getResources = async () => {
  const res = await api.get("/api/resources");
  return res.data;
};

// 리소스 상세 조회
export const getResource = async (id) => {
  const res = await api.get(`/api/resources/${id}`);
  return res.data;
};

// 리소스 생성
export const createResource = async (resource) => {
  const res = await api.post("/api/resources", resource);
  return res.data;
};

// 리소스 수정
export const updateResource = async (id, resource) => {
  const res = await api.patch(`/api/resources/${id}`, resource);
  return res.data;
};

// 리소스 삭제
export const deleteResource = async (id) => {
  const res = await api.delete(`/api/resources/${id}`);
  return res.data;
};