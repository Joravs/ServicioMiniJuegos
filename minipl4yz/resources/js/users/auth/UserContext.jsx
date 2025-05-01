import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import getCsrfToken from '@/hooks/getToken';
import APP__URL from '@/hooks/variables';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const addExperience = async (points, difficulty = 1, timeModifier = 1) => {
    const finalExp = Math.floor(points * difficulty * timeModifier);
    const newXp = user.xp + finalExp;
    let newLevel = user.nivel;
    const expToNextLevel = 100 * user.nivel;

    if (newXp >= expToNextLevel) {
      newLevel++;
      toast.success(`¡Felicidades! Subiste al nivel ${newLevel}!`);
    }

    const updatedUser = { ...user, xp: newXp, nivel: newLevel };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    await fetch(`${APP__URL}/api/experience`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken(),
      },
      body: JSON.stringify({xp: user.xp, nivel: user.nivel}),
    })
  };

  const setUserData = (data) => {
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const logoutLocal = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, addExperience, setUserData, logoutLocal }}>
      {children}
    </UserContext.Provider>
  );
};