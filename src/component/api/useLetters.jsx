import { useState, useEffect, useCallback } from "react";
import useApi from "./useApi";

const useLetters = () => {
  const [letters, setLetters] = useState([]);
  const [loadingLetters, setLoadingLetters] = useState(true);
  const [error, setError] = useState(null);
  const api = useApi();

  console.log("apidsdf0", api);

  const fetchLetters = useCallback(async () => {
    setLoadingLetters(true);
    setError(null);
    try {
      const data = await api.get("/api/letters");
      setLetters(data);
    } catch (err) {
      setError("Failed to load letters. Please try again later.");
      console.error("Error fetching letters:", err);
    } finally {
      setLoadingLetters(false);
    }
  }, []);

  useEffect(() => {
    fetchLetters();
  }, []);

  const createLetter = useCallback(
    async (letterData) => {
      try {
        const newLetter = await api.post("/api/letters", letterData);
        setLetters((prev) => [...prev, newLetter]);
        return newLetter;
      } catch (err) {
        throw err;
      }
    },
    []
  );

  const updateLetter = useCallback(
    async (id, letterData) => {
      try {
        const updatedLetter = await api.put(`/api/letters/${id}`, letterData);
        setLetters((prev) =>
          prev.map((letter) => (letter._id === id ? updatedLetter : letter))
        );
        return updatedLetter;
      } catch (err) {
        throw err;
      }
    },
    []
  );

  const deleteLetter = useCallback(
    async (id) => {
      try {
        await api.delete(`/api/letters/${id}`);
        setLetters((prev) => prev.filter((letter) => letter._id !== id));
      } catch (err) {
        throw err;
      }
    },
    []
  );

  const saveToDrive = useCallback(
    async (id) => {
      try {
        return await api.post(`/api/letters/${id}/save-to-drive`);
      } catch (err) {
        throw err;
      }
    },
    []
  );

  return {
    letters,
    loadingLetters,
    error,
    fetchLetters,
    createLetter,
    updateLetter,
    deleteLetter,
    saveToDrive,
  };
};

export default useLetters;
